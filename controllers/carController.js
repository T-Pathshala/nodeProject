const carModel = require("../models/carModel");

exports.adminAddCar = async (req, res) => {
  try {
    // const name = req.body.name;
    const { name, type, price, sit, ac, carNumber } = req.body ?? {};

    if (!name || !type || !price || !sit || !ac || !carNumber)
      return res.status(200).json({
        status: 0,
        msg: "name,type,price, sit,  ac, carNumber  fields are required",
      });
    const addCar = await carModel.create({
      name,
      type,
      price,
      sit,
      ac,
      carNumber,
    });
    if (!addCar)
      return res.status(200).json({ status: 0, msg: "Data not save" });
    return res.status(200).json({ status: 1, data: addCar });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something error");
  }
};
