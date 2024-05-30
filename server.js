const dotenv = require("dotenv");

const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log(err);
  console.log("Uncaught exception occured,server will shut down...");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const MONGO_URL = process.env.MONGO_SERVER;

mongoose.connect(MONGO_URL).then(() => console.log("Connected successfully"));

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`applicaton running on ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured,server will shut down...");
  server.close(() => {
    process.exit(1);
  });
});
