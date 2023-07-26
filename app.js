const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const nodemailer = require("nodemailer");
const contctRoute = require("./routes/contactRoute");
const registrationRoute = require("./routes/registrationRoute");
const carRoute = require("./routes/carRoute");
const { log } = require("console");

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

const transporter = nodemailer.createTransport({
  host: "webextremesinternational.com",
  secure: true,
  secureConnection: true, // TLS requires secureConnection to be false
  port: 465,
  debug: true,
  auth: {
    user: "testing@webextremesinternational.com",
    pass: "testing@123",
  },
});

const info = transporter.sendMail(
  {
    from: '"Fred Foo 👻" <testing@webextremesinternational.com>', // sender address
    to: "somnathpoddar615@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world",
    html: "<b>Hello world?</b>", // html body
  },
  (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  }
);

console.log(info);
