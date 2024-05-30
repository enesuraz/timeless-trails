const AppError = require("../utils/AppError");

function handleCastError(err) {
  const errorMessage = `Invalid ${err.path}: ${err.value}`;
  return new AppError(errorMessage, 400);
}

function handleDuplicate(err) {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const errorMessage = `Duplicate field value: ${value}`;
  return new AppError(errorMessage, 400);
}

function handleValidation(err) {
  const errors = Object.values(err.errors).map((el) => el.message);
  const errorMessage = `Invalid input data.${errors.join(".")}`;
  return new AppError(errorMessage, 400);
}

function handleJWTError() {
  return new AppError("Invalid token id.Please login again", 401);
}

function handleJWTExpiresError() {
  return new AppError("Token was expired.Please login again", 401);
}

function errorHandlerDevelopment(err, req, res) {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  res.status(err.statusCode).render("base/error", {
    msg: err.message,
  });
}

function errorHandlerProduction(err, req, res) {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  } else {
    if (err.isOperational) {
      res.status(err.statusCode).render("base/error", {
        msg: err.message,
      });
    } else {
      console.error(err);
      res.status(500).render("base/error", {
        msg: "Please try again later",
      });
    }
  }
}

exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    errorHandlerDevelopment(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = err;
    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicate(error);
    if (error.name === "ValidationError") error = handleValidation(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiresError();
    errorHandlerProduction(error, req, res);
  }
};
