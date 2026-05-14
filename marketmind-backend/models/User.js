const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    watchlist: [
      {
        type: String,
      },
    ],

    virtualBalance: {
      type: Number,
      default: 100000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);