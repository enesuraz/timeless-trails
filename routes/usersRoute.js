const router = require("express").Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.patch("/update-password", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch(
  "/update-me",
  userController.uploadPhoto,
  userController.resizePhoto,
  userController.updateMe
);
router.delete("/delete-me", userController.deleteMe);

router.use(authController.restrictTo("admin"));

router.get("/", userController.getAllUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
