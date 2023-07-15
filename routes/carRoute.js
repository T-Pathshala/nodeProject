const express = require("express");
const router = express.Router();
const { adminAddCar } = require("./../controllers/carController");
const { adminVerify } = require("./../middlewares/tokenVerify");

router.post("/add-car", adminVerify, adminAddCar);

module.exports = router;
