const Tour = require("../models/toursModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const Review = require("../models/reviewModel");

const Booking = require("../models/BookingModel");

exports.viewAlert = (req, res, next) => {
  if (req.query.alert && req.query.includes("booking")) {
    res.locals.alert = "Your booking successfully created!!!";
  }

  next();
};

// Overviews
exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  return res.status(200).render("overview/overview", {
    tours,
  });
});

exports.getTour = async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    select: "review rating user",
  });

  if (!tour) return next(new AppError("Tour not found with that name", 404));
  if (!req.user) return res.status(200).render("authentication/login");

  res.status(200).render("overview/tour", {
    tour,
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  const userBookings = await Booking.find({ user: req.user.id });

  const tourIDs = userBookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render("overview/overview", {
    tours,
  });
});

// Authentication
exports.login = (req, res, next) => {
  res.status(200).render("authentication/login");
};

exports.signup = (req, res, next) => {
  res.status(200).render("authentication/signup");
};

exports.forgot = (req, res, next) => {
  res.status(200).render("authentication/forgot");
};
exports.resetPassword = (req, res, next) => {
  res.status(200).render("authentication/reset", {
    currentUrl: req.url,
  });
};

// User vievs

exports.settings = (req, res, next) => {
  res.status(200).render("account/account", {
    currentUrl: req.url,
  });
};

exports.getReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id });

  if (!reviews)
    return next(new AppError("Reviews not found with that user", 404));

  res.status(200).render("account/account", {
    currentUrl: req.url,
    reviews,
  });
});

exports.getMyBooking = catchAsync(async (req, res, next) => {
  let bookings = [];
  bookings = await Booking.find({ user: req.user.id });

  res.status(200).render("account/account", {
    currentUrl: req.url,
    bookings,
  });
});

// Admin views
exports.adminTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render("account/account", {
    currentUrl: req.url,
    tours,
  });
});

exports.adminEditTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug });

  const users = await User.find();

  if (!tour) return next(new AppError("Tour not found with that name", 404));

  res.status(200).render("account/account", {
    currentUrl: req.url,
    tour,
    users,
  });
});

exports.adminCreateTour = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).render("account/account", {
    currentUrl: req.url,
    users,
  });
});

exports.adminUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).render("account/account", {
    currentUrl: req.url,
    users,
  });
});

exports.adminBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();
  res.status(200).render("account/account", {
    currentUrl: req.url,
    bookings,
  });
});
