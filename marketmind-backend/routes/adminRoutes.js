const express = require("express");
const router = express.Router();

const User = require("../models/User");
const News = require("../models/News");

/* GET ALL USERS */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select(
      "-password"
    );

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});

/* GET ALL NEWS */
router.get("/news", async (req, res) => {
  try {
    const news = await News.find().sort({
      createdAt: -1,
    });

    res.json(news);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch news",
    });
  }
});

module.exports = router;