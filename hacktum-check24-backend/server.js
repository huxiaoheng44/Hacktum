const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const cors = require("cors");
const api = require("./api.js");

const {
  getMappedCraftsman,
  patchMappedCraftman,
  getCraftsmen,
  updateCraftsman,
} = require("./craftsmen-service");

const databaseName = "Hacktum-check24";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: databaseName,
};

app.use(express.json());
app.use(cors());
app.use("/api", api);
//app.use("/craftman", validateUpdateCraftsman);

// server error handle
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request!");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

app.get("/craftsmen", async (req, res) => {
  const { postalcode } = req.query;

  const craftsmen = await getCraftsmen(postalcode);

  return res.send({
    craftsmen: craftsmen.map(getMappedCraftsman), //craftsmen.map(getMappedCraftsman),
  });
});

app.patch("/craftman/:id", async (req, res) => {
  // ideally should be validated & sanitzed.
  try {
    const id = req.params.id;

    const { maxDrivingDistance, profilePictureScore, profileDescriptionScore } =
      req.body;

    if (
      !(maxDrivingDistance || profilePictureScore || profileDescriptionScore)
    ) {
      return res
        .status(400)
        .json({ error: "At least one attribute should be provided." });
    }

    const updatedCraftsman = await updateCraftsman(id, req.body);

    res.send({
      id: id,
      updated: updatedCraftsman,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// start the server
const port = process.env["SERVER_PORT"] || 3000;

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
