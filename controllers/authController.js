const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");

const catchAsync = require("../utils/catchAsync");

const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const Email = require("../utils/email");

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_JWT,
  });
}

function sendToken(user, statusCode, res, message) {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    message,
  });
}

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  sendToken(user, 201, res, "User was created");
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Please provide credentials", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.correctPassword(password, user.password))
    return next(new AppError("Incorrect credentials", 401));

  sendToken(user, 200, res, "Login successfully");
});

exports.logout = (req, res, next) => {
  res.clearCookie("jwt");

  return res
    .status(200)
    .json({ status: "success", message: "Logged Out successfully" });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) return next(new AppError("You are not logged in", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user)
    return next(
      new AppError("The user belonging this token does no longer exist", 401)
    );

  if (user.changedPasswordAfter(decoded.iat))
    return next(
      new AppError("User recently changed password.Please login again", 401)
    );

  res.locals.user = user;
  req.user = user;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const user = await User.findById(decoded.id);

      if (!user) return next();

      if (user.changedPasswordAfter(decoded.iat)) return next();

      res.locals.user = user;
      req.user = user;
      return next();
    }
  } catch (err) {
    next();
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      next(new AppError("You are not authorized", 403));

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError("There is no user with this email", 400));

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get("host")}/ui/resetPassword/${resetToken}`;

  try {
    await new Email(user, resetURL).passwordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new AppError("Error when we trying to send email", 400));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Token is invalid or expired", 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  sendToken(user, 200, res, "Reset password successfully");
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!user.correctPassword(req.body.currentPassword, user.password))
    return next(new AppError("Old password is not true", 401));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  sendToken(user, 200, res, "Update Password successfully");
});
