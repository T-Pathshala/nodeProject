const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");

const contctRoute = require("./routes/contactRoute");
const registrationRoute = require("./routes/registrationRoute");
const carRoute = require("./routes/carRoute");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/user", contctRoute);
app.use("/user", registrationRoute);
app.use("/user", carRoute);

app.get("/", async (req, res) => {
  try {
    let count = 0;
    // const data = fs.readFileSync("./data.json", {
    //   encoding: "utf8",
    //   flag: "r",
    // });
    // console.log(data);

    fs.readFile("./data.json", function (err, data) {
      if (err) return;
      console.log(data.toString());
    });

    for (let i = 0; i < 5; i++) {
      count += 1;
    }
    console.log(count);
    console.log("Hello world");

    res.status(200).json({ status: 1, data: "true" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 0, data: "something error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB CONNECTED SUCCESSFULLY`);
  })
  .catch((err) => {
    console.log(err);
  });
