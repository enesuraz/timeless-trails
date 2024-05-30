import {
  handleAdminUsersSubmit,
  handleAdminUsersDelete,
} from "./adminUsersForm";
import { handleMap } from "./map";
import { bookingTour } from "./stripe";

import {
  handleSubmitReview,
  handleDeleteReview,
  makeStartRate,
} from "./reviewFormLogic";

import {
  handleAddLocationsClick,
  generateLocationsMarkup,
  handleAddUser,
  guides,
  handlePhotosFile,
  handleCoverImage,
  handleAddDate,
  dates,
  handleTourSubmit,
  handleDeleteTour,
  tourForm,
} from "./tourFormLogic";
import {
  handleLogout,
  handleUserImage,
  handleUserSubmit,
  form,
  updateForm,
  userImageFile,
  handleDeleteUser,
} from "./userFormLogic";

// Admin Users
const usersAdmin = document.querySelectorAll(".form--users");
const usersAdminDelete = document.querySelectorAll(
  ".form__delete--user-delete"
);

usersAdmin?.forEach((form) => {
  form.addEventListener("submit", handleAdminUsersSubmit);
});

usersAdminDelete?.forEach((btn) => {
  btn.addEventListener("click", handleAdminUsersDelete);
});

// Reviews
const createReviewForm = document.querySelector(".form--create-review");
const updateReviewForms = document.querySelectorAll(".form--update-review");
const deleteReviewButtons = document.querySelectorAll(
  ".form__delete--review-delete"
);
const deleteReviewBtn = document.querySelector(".review__delete-btn");

createReviewForm?.addEventListener("submit", handleSubmitReview);

updateReviewForms?.forEach((el) => {
  el.addEventListener("submit", handleSubmitReview);
});

deleteReviewBtn?.addEventListener("click", handleDeleteReview);
deleteReviewButtons?.forEach((btn) => {
  btn.addEventListener("click", handleDeleteReview);
});

window.handleStar = function handleStar(e) {
  const starRate = +e.target.closest(".form__star").dataset.star;
  const allButtons = e.target
    .closest(".form__group--stars")
    .querySelectorAll(".form__star");
  makeStartRate(allButtons, starRate);
};

// Stripe
const bookingBtn = document.querySelector(".btn--booking");

bookingBtn?.addEventListener("click", (e) => {
  const tourId = e.target.dataset.tour;
  bookingTour(tourId, e.target);
});

// Tour Form
const addLocationBtn = document.querySelector(".btn--locations");
const addUserBtn = document.querySelector(".btn--user");
const photosFile = document.getElementById("photos");
const coverImage = document.getElementById("cover");
const dateBtn = document.querySelector(".btn--date");
const deleteBtn = document.querySelectorAll(".btn--delete-tour");

addLocationBtn?.addEventListener("click", handleAddLocationsClick);

window.deleteLocationItem = function deleteLocationItem(e) {
  e.preventDefault();

  const locations = JSON.parse(e.target.dataset.locations);

  const order = e.target.dataset.order;

  locations.splice(+order, 1);

  generateLocationsMarkup(locations, e.target);
};

addUserBtn?.addEventListener("click", handleAddUser);

window.deleteUser = function deleteUser(e) {
  const id = e.target.dataset.user;

  const element = e.target.closest(".form__user");

  element.remove();

  guides.splice(guides.indexOf(id), 1);
};

photosFile?.addEventListener("change", handlePhotosFile);

coverImage?.addEventListener("change", handleCoverImage);

dateBtn?.addEventListener("click", handleAddDate);

window.deleteDate = function deleteDate(e) {
  const date = e.target.dataset.date;

  const element = e.target.closest(".form__date");

  element.remove();

  dates.splice(guides.indexOf(date), 1);
};

tourForm?.addEventListener("submit", handleTourSubmit);

deleteBtn?.forEach((btn) => {
  btn.addEventListener("click", handleDeleteTour);
});

// User Form
const logout = document.querySelector("#logout");
const userDeleteButton = document.querySelector(
  ".form__delete--delete-yourself"
);

userImageFile?.addEventListener("change", handleUserImage);

form?.addEventListener("submit", handleUserSubmit);
updateForm?.addEventListener("submit", handleUserSubmit);
logout?.addEventListener("click", handleLogout);
userDeleteButton?.addEventListener("click", handleDeleteUser);

// Map
if (document.getElementById("map")) handleMap();

//Stripe Alert
const stripeAlert = document.querySelector("body").dataset?.alert;
if (stripeAlert) {
  alert(stripeAlert);
}
