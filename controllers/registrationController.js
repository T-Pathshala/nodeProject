const registrationModel = require("../models/registrationModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.registration = async (req, res) => {
  try {
    // const name = req.body.name;
    const { name, email, phone, password, gender, confirmPassword } =
      req.body ?? {};
    console.log(req.body);
    if (!name || !email || !phone || !password || !gender || !confirmPassword)
      return res.status(200).json({ status: 0, msg: "Please fill all fields" });

    if (password !== confirmPassword)
      return res.status(200).json({
        status: 0,
        msg: "Password and confirm password does not match",
      });

    const checkUserPhone = await registrationModel.findOne({ phone: phone });
    if (checkUserPhone)
      return res.status(200).json({
        status: 0,
        msg: "Phone number already registered",
      });

    const checkUserEmail = await registrationModel.findOne({ email: email });
    if (checkUserEmail)
      return res.status(200).json({
        status: 0,
        msg: "Email already registered",
      });

    const hasPass = await bcryptjs.hash(password, 10);

    const createUser = await registrationModel.create({
      name: name,
      email: email,
      phone: phone,
      password: hasPass,
      gender: gender,
      role: "user",
    });

    if (!createUser)
      return res.status(200).json({
        status: 0,
        msg: "User not created",
      });

    createUser.password = null;

    const token = await jwt.sign(
      {
        name: createUser.name,
        email: createUser.email,
        phone: createUser.phone,
        role: createUser.role,
      },
      process.env.JWT_KEY
    );

    console.log(token);

    return res.status(200).json({ status: 1, token, data: createUser });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something error");
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body ?? {};

    if (!phone || !password)
      return res
        .status(200)
        .json({ status: 0, msg: "Phone and Password are required" });

    const getUser = await registrationModel.findOne({ phone: phone });

    if (!getUser)
      return res
        .status(200)
        .json({ status: 0, msg: "Phone number is not registered" });

    let passStr = password.toString();

    // FOR CHECK PASSWORD
    const checkPass = await bcryptjs.compare(passStr, getUser.password);
    if (!checkPass)
      return res
        .status(200)
        .json({ status: 0, msg: "password does not matched" });

    const token = await jwt.sign(
      {
        name: getUser.name,
        email: getUser.email,
        phone: getUser.phone,
        role: getUser.role,
      },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 * 24 * 365 }
    );
    getUser.password = null;
    return res.status(200).json({ status: 1, token, data: getUser });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something error");
  }
};
