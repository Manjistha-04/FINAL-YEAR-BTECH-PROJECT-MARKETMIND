console.log("THIS BACKEND FILE IS RUNNING 🚀");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "MarketMind Backend Running 🚀" });
});
app.get("/api/test", (req, res) => {
    res.json({
        message: "Backend connected successfully 🚀"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
