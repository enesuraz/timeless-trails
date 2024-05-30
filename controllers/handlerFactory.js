const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const APIFilters = require("../utils/apiFilters");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter.tour = req.params.tourId;
    const filters = new APIFilters(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await filters.query;

    res.status(201).json({
      status: "success",
      result: doc.length,
      data: {
        doc,
      },
    });
  });

exports.getOne = (Model, ...popOptions) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id).populate(popOptions);

    if (!doc) return next(new AppError("Can't find doc with that id", 404));

    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError("Can't find doc with that id", 404));

    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError("Can't find doc with that id", 404));

    res.status(200).json({
      status: "success",
      message: "Deleted successfully",
      data: null,
    });
  });
