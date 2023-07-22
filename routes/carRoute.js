const express = require("express");
const router = express.Router();
const {
  adminAddCar,
  editCar,
  adminGetAllCar,
  deleteCar,
} = require("./../controllers/carController");
const { adminVerify } = require("./../middlewares/tokenVerify");

router.post("/add-car", adminVerify, adminAddCar);
router.post("/get-all-car", adminVerify, adminGetAllCar);
router.post("/edit-car/:id", adminVerify, editCar);
router.post("/delete-car/:id", adminVerify, deleteCar);
router.put("/edit-car/:id", adminVerify, editCar);
router.patch("/edit-car/:id", adminVerify, editCar);

module.exports = router;
