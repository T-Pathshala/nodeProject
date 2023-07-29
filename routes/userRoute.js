const express = require("express");
const router = express.Router();
const {
  getCarPrice,
  createOrder,
  verifyPaymet,
} = require("./../controllers/userController");
router.post("/get-car-price", getCarPrice);

router.post("/createOrder", createOrder);

router.post("/verifyPaymet", verifyPaymet);
module.exports = router;
