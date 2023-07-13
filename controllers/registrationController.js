const registrationModel = require("../models/registrationModel");
const bcryptjs = require("bcryptjs");
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

    return res.status(200).json({ status: 1, data: createUser });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something error");
  }
};
