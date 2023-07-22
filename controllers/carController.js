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

exports.editCar = async (req, res) => {
  try {
    const id = req.params.id;

    const { name, type, price, sit, ac, carNumber } = req.body ?? {};
    if (!name || !type || !price || !sit || !ac || !carNumber)
      return res.status(200).json({
        status: 0,
        msg: "name,type,price, sit,  ac, carNumber  fields are required",
      });

    const updateCar = await carModel.updateOne(
      { _id: id },
      {
        name,
        type,
        price,
        sit,
        ac,
        carNumber,
      }
    );
    if (!updateCar)
      return res.status(200).json({
        status: 0,
        msg: "car not updated",
      });

    return res.status(200).json({
      status: 1,
      msg: "update successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something error");
  }
};

exports.adminGetAllCar = async (req, res) => {
  const allCar = await carModel.find();
  if (!allCar)
    return res.status(200).json({
      status: 0,
      msg: "car not found",
    });

  return res.status(200).json({
    status: 1,
    data: allCar,
  });
};

exports.deleteCar = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteCar = await carModel.deleteOne({ _id: id });
    if (!deleteCar)
      return res.status(200).json({
        status: 0,
        msg: "car not Deleted",
      });

    return res.status(200).json({
      status: 1,
      msg: "car Deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something error");
  }
};
