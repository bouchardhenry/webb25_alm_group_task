const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    rent: { type: Number, required: true, min: [0, "Rent must be non-negative"] },
    rooms: { type: Number, required: true, min: [1, "Rooms must be at least 1"] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Accommodation", accommodationSchema);
