const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      new Date().getTime() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
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
router.post("/addCarType", upload.single("image"), async (req, res) => {
  const path = req.file.path;
  const type = req.body.type;
  const price = req.body.price;
  console.log(path, type, price);
});

router.put("/edit-car/:id", adminVerify, editCar);
router.patch("/edit-car/:id", adminVerify, editCar);
router.delete("/delete-car/:id", adminVerify, deleteCar);

module.exports = router;
