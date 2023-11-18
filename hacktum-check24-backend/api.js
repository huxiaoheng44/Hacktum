const express = require("express");
const router = express.Router();
// const Message = require("./models/message"); // Assuming you have a model called Message

// Search endpoint
router.get("/craftsmen", async (req, res) => {
  try {
    const searchQuery = req.query.query; // Get the search term from the query string
    if (!searchQuery) {
      return res.status(400).send({ message: "Search query is required." });
    }

    console.log(searchQuery);
    // Perform a search on the Message model
    // For example, find messages that contain the search term in their content
    const results = await Message.find({
      content: { $regex: new RegExp(searchQuery), $options: "i" }, // This is a simple regex search, not efficient for large data sets
    });

    res.status(200).json(results);
  } catch (err) {
    console.error("Error during search:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;

module.exports = router;
