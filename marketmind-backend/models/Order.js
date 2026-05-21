const mongoose = require("mongoose");

const orderSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      username: {
        type: String,
      },

      ticker: {
        type: String,
        required: true,
      },

      company: {
        type: String,
      },

      type: {
        type: String,
        enum: ["BUY", "SELL"],
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      total: {
        type: Number,
      },

      time: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );