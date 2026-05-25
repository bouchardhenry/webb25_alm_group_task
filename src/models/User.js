const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    profilePicture: {
      type: String,
      match: [/^https?:\/\/.+/, "profilePicture must be a valid URL"],
    },
  },
  { timestamps: true }
);

userSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const Accommodation = require("./Accommodation");
    await Accommodation.deleteMany({ userId: doc._id });
  }
});

module.exports = mongoose.model("User", userSchema);
