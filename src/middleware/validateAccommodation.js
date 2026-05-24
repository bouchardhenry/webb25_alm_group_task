const REQUIRED_FIELDS = ["address", "city", "country", "zipCode", "rent", "rooms"];

const validateAccommodation = (req, res, next) => {
  const body = req.body;
  const missing = REQUIRED_FIELDS.filter((f) => body[f] === undefined || body[f] === "");

  if (missing.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missing.join(", ")}` });
  }

  if (typeof body.rent !== "number" || body.rent < 0) {
    return res.status(400).json({ message: "rent must be a non-negative number" });
  }

  if (typeof body.rooms !== "number" || body.rooms < 1) {
    return res.status(400).json({ message: "rooms must be a number >= 1" });
  }

  next();
};

module.exports = validateAccommodation;
