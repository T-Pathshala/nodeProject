const mongoose = require("mongoose");

const carTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    require: ["true", "Type is required"],
  },
  price: {
    type: Number,
    require: ["true", "Price is required"],
  },
  image: {
    type: String,
    require: ["true", "image is required"],
  },
});

const carTypeModel = mongoose.model("carType", carTypeSchema);
module.exports = carTypeModel;
