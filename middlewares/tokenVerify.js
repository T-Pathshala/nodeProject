const jwt = require("jsonwebtoken");

exports.adminVerify = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    let token = false;

    if (authToken.startsWith("Bearer")) {
      token = authToken.split(" ")[1];
    }

    if (!token)
      return res.status(200).json({ status: 0, msg: "Token is required" });

    const decode = jwt.verify(token, process.env.JWT_KEY);

    if (!decode)
      return res.status(200).json({ status: 0, msg: "Token is not valied" });
    if (decode.role == "admin") {
      req.user = decode;
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 0, msg: "Something error" });
  }
};

exports.userVerify = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    let token = false;

    if (authToken.startsWith("Bearer")) {
      token = authToken.split(" ")[1];
      console.log(token);
    }
    if (!token)
      return res.status(200).json({ status: 0, msg: "Token is required" });

    const decode = jwt.verify(token, process.env.JWT_KEY);

    if (!decode)
      return res.status(200).json({ status: 0, msg: "Token is not valied" });
    if (decode.role == "user") {
      req.user = decode;
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 0, msg: "Something error" });
  }
};
