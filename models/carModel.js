const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    require: ["true", "Type is required"],
  },
  type: {
    type: String,
    require: ["true", "Type is required"],
  },
  price: {
    type: Number,
    require: ["true", "Price is required"],
  },
  sit: {
    type: Number,
  },
  ac: {
    type: String,
    require: ["true", "Ac is required"],
  },
  carNumber: {
    type: String,
    require: ["true", "Car registration number is required"],
  },
});

const carModel = mongoose.model("car", carSchema);
module.exports = carModel;
