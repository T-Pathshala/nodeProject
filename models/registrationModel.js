const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    require: ["true", "Name is required"],
  },
  email: {
    type: String,
    require: ["true", "Email is required"],
  },
  phone: {
    type: Number,
    require: ["true", "Mobile number is required"],
  },
  password: {
    type: String,
    require: ["true", "Password is required"],
  },
  role: {
    type: String,
    require: ["true", "Role is required"],
  },
  gender: {
    type: String,
    require: ["true", "Gender is required"],
  },
});

const registrationModel = mongoose.model("registration", registrationSchema);
module.exports = registrationModel;
