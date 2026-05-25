const repo = require("../repositories/AccommodationRepository");

const getAll = async (req, res) => {
  try {
    const accommodations = await repo.findAll();
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const accommodation = await repo.findById(req.params.id);
    if (!accommodation) return res.status(404).json({ message: "Accommodation not found" });
    res.json(accommodation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByUserId = async (req, res) => {
  try {
    const accommodations = await repo.findByUserId(req.params.userId);
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const accommodation = await repo.create(req.body);
    res.status(201).json(accommodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const accommodation = await repo.update(req.params.id, req.body);
    if (!accommodation) return res.status(404).json({ message: "Accommodation not found" });
    res.json(accommodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const accommodation = await repo.remove(req.params.id);
    if (!accommodation) return res.status(404).json({ message: "Accommodation not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAll, getById, getByUserId, create, update, remove };
