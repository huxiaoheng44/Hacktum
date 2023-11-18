const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");

const api = require("./api.js");

// Need to add Server IP address in MongoDB
const mongoConnectionURL = "";

const databaseName = "Hacktum-check24";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: databaseName,
};

// mongoose
//   .connect(mongoConnectionURL, options)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

// Create a express server
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", api);

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

// start the server
app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
