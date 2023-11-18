const express = require("express");
const app = express();
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

app.use(express.json());
app.use(cors());
app.use("/api", api);

// const dataSchema = new mongoose.Schema({
//   id: Number,
//   name: String,
//   postalCode: String,
//   // rankingScore: String,
// });

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
  // ideally should be validated & sanitzed.
  const { postalcode } = req.query;

  // const craftsmen = await getCraftsmen(postalcode);

  // const rankedCraftsmen = craftsmen.map((item) => {
  //   return { ...item.toObject(), rankingScore: "calculateRanking" };
  // });

  const rankedCraftsmen = {
    craftsmen: [
      {
        id: 1,
        name: "Leon Ramos",
        postalCode: "80686",
        rankingScore: "5.46",
      },
      {
        id: 2,
        name: "Constant Woolery",
        postalCode: "80687",
        rankingScore: "3.27",
      },
      {
        id: 3,
        name: "Eva Malone",
        postalCode: "80689",
        rankingScore: "4.43",
      },
    ],
  };

  return res.send({
    craftsmen: rankedCraftsmen, //craftsmen.map(getMappedCraftsman),
  });
});

// start the server
const port = process.env["SERVER_PORT"] || 3000;

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
