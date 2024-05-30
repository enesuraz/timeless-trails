const Tour = require("../models/toursModel");
const AppError = require("../utils/AppError");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const multerStorage = multer.memoryStorage();

function multerFilter(req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not and image! Please upload only images", 400), false);
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 4 },
]);

exports.resizeImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover && !req.files.images) return next();

  if (req.files.imageCover) {
    const uniqueId = req.params.id
      ? req.params.id
      : Math.random().toString(16).slice(2);
    req.body.imageCover = `tour-${uniqueId}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/assets/tours/${req.body.imageCover}`);
  }

  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `tour-${uniqueId}-${Date.now()}-${i + i}.jpeg`;

        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/assets/tours/${filename}`);
        req.body.images.push(filename);
      })
    );
  }

  next();
});

exports.deleteOldImage = catchAsync(async (req, res, next) => {
  if (!req.body.imageCover && !req.body.images) return next();
  const tour = await Tour.findById(req.params.id);

  if (req.body.imageCover && tour.imageCover) {
    fs.unlinkSync(
      path.join(__dirname, "..", "public", "assets", "tours", tour.imageCover)
    );
  }

  if (req.body.images && tour.images) {
    tour.images.forEach((image) => {
      fs.unlinkSync(
        path.join(__dirname, "..", "public", "assets", "tours", image)
      );
    });
  }

  next();
});

exports.aliasTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  next();
};

exports.rearrangeBody = (req, res, next) => {
  if (req.body.duration) req.body.duration = +req.body.duration;
  if (req.body.maxGroupSize) req.body.maxGroupSize = +req.body.maxGroupSize;
  if (req.body.price) req.body.price = +req.body.price;
  if (req.body.locations) req.body.locations = JSON.parse(req.body.locations);
  if (req.body.startLocation)
    req.body.startLocation = JSON.parse(req.body.startLocation);
  if (req.body.guides) req.body.guides = JSON.parse(req.body.guides);

  next();
};

exports.createTour = factory.createOne(Tour);

exports.getAllTour = factory.getAll(Tour);

exports.getTour = factory.getOne(Tour, { path: "reviews" });
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng)
    return next(new AppError("Please provide latitude and longitude", 400));
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      data: tours,
    },
  });
});

exports.getDistance = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  if (!lat || !lng)
    return next(new AppError("Please provide latitude and longitude", 400));

  const multiplier = unit === "mi" ? 0.000621371 : 0.001;

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: "distance",
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      data: distances,
    },
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: `$${req.query.groupBy || "difficulty"}` },
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    { $sort: { avgPrice: 1 } },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = +req.params.year;
  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },

    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      plan,
    },
  });
});
