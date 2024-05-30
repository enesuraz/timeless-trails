const router = require("express").Router();

const toursController = require("../controllers/toursController");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

const reviewRoutes = require("./reviewRoute");

router.use("/:tourId/reviews", reviewRoutes);

router.get(
  "/top-5-cheap",
  toursController.aliasTours,
  toursController.getAllTour
);

router.get("/get-stats", toursController.getTourStats);
router.get(
  "/get-monthly-plan/:year",
  authController.restrictTo("admin", "lead", "lead-guide"),
  toursController.getMonthlyPlan
);
router.get(
  "/tours-within/:distance/center/:latlng/unit/:unit",
  toursController.getToursWithin
);
router.get("/distances/:latlng/unit/:unit", toursController.getDistance);

router
  .route("/")
  .get(authController.protect, toursController.getAllTour)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    toursController.uploadImages,
    toursController.resizeImages,
    toursController.rearrangeBody,
    toursController.createTour
  );

router
  .route("/:id")
  .get(toursController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    toursController.uploadImages,
    toursController.resizeImages,
    toursController.rearrangeBody,
    toursController.deleteOldImage,
    toursController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    toursController.deleteTour
  );

module.exports = router;
