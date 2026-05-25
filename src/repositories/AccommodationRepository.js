const Accommodation = require("../models/Accommodation");

const findAll = () => Accommodation.find();

const findById = (id) => Accommodation.findById(id);

const findByUserId = (userId) => Accommodation.find({ userId });

const create = (data) => Accommodation.create(data);

const update = (id, data) =>
  Accommodation.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const remove = (id) => Accommodation.findByIdAndDelete(id);

module.exports = { findAll, findById, findByUserId, create, update, remove };
