const router = require("express").Router();

const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

router.get("/", authController.isLoggedIn, viewController.getOverview);
router.get(
  "/my-tours",
  authController.isLoggedIn,
  viewController.viewAlert,
  viewController.getMyTours
);

router.get("/tour/:slug", authController.isLoggedIn, viewController.getTour);

// Authentication
router.get("/login", authController.isLoggedIn, viewController.login);
router.get("/signup", authController.isLoggedIn, viewController.signup);
router.get("/forgot", viewController.forgot);
router.get("/ui/resetPassword/:token", viewController.resetPassword);

// User views
router.get(
  "/account/settings",
  authController.protect,
  viewController.settings
);
router.get(
  "/account/bookings",
  authController.protect,
  viewController.getMyBooking
);
router.get(
  "/account/reviews",
  authController.isLoggedIn,
  viewController.getReviews
);

// Admin views
router.get(
  "/account/admin-tours",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.adminTours
);
router.get(
  "/account/admin-tours/create",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.adminCreateTour
);
router.get(
  "/account/admin-tours/:slug",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.adminEditTour
);
router.get(
  "/account/admin-users",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.adminUsers
);
router.get(
  "/account/admin-bookings",
  authController.protect,
  authController.restrictTo("admin", "lead-guide"),
  viewController.adminBookings
);

module.exports = router;
