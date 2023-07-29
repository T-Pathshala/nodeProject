const carModel = require("../models/carModel");
const carTypeModel = require("../models/carTypeModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");
exports.getCarPrice = async (req, res) => {
  try {
    const { distance } = req.body ?? {};

    const allCarType = await carTypeModel.find();

    const allCarTypeWithPrice = [];

    for (let i = 0; i < allCarType.length; i++) {
      let carObj = allCarType[i];
      carObj.price = carObj.price * distance;
      allCarTypeWithPrice.push(carObj);
    }

    if (allCarTypeWithPrice.length < 1)
      return res.status(200).json({ status: 0, msg: "No car found" });
    return res.status(200).json({ status: 1, data: allCarTypeWithPrice });
    return;
  } catch (err) {
    console.log(err);
    return res.status(400).json("something error");
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { price } = req.body ?? {};
    const instance = new Razorpay({
      key_id: "rzp_test_wQ4bmPH4dTk3cv",
      key_secret: "acwrDOk11lX8vGq8aTtSIDKA",
    });

    const options = {
      amount: price, // amount in the smallest currency unit
      currency: "INR",
      receipt: "TechPathsala-" + new Date().getTime(),
    };

    instance.orders.create(options, function (err, order) {
      if (err) {
        console.log(err);
        return res.status(200).json({ status: 0, msg: "Order id not created" });
      } else {
        return res.status(200).json({ status: 1, data: order });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json("something error");
  }
};

exports.verifyPaymet = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body ?? {};

    const hmac = crypto.createHmac("sha256", "acwrDOk11lX8vGq8aTtSIDKA");

    const data = hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

    const genarated_signature = data.digest("hex");

    if (razorpay_signature === genarated_signature) {
      return res.status(200).json({ status: 1, msg: "Payment verified" });
    } else {
      return res.status(200).json({ status: 0, msg: "Payment not verified" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json("something error");
  }
};
