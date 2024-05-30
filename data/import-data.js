const fs = require("fs");

const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_SERVER;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.err(err));

const Tour = require("../models/toursModel");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");

const tours = JSON.parse(fs.readFileSync("tours.json"));
const reviews = JSON.parse(fs.readFileSync("reviews-data.json"));
const users = JSON.parse(fs.readFileSync("users-data.json"));

async function importData() {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log("Imported Data successfully");
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

async function deleteData() {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("Deleted data successfully");
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

if (process.argv[2] === "--import") {
  importData();
}

if (process.argv[2] === "--delete") {
  deleteData();
}
