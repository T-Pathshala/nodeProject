const contactModel = require("../models/contactModel");
exports.contact = async (req, res) => {
  try {
    // const name = req.body.name;
    const { name, email, phone, subject, msg } = req.body ?? {};
    console.log(req.body);
    if (!name || !email || !phone || !msg || !subject)
      return res.status(200).json({
        status: 0,
        msg: "name, email, phone, subject, msg  fields are required",
      });
    const contact = await contactModel.create({
      name: name,
      email: email,
      phone: parseInt(phone),
      subject: subject,
      msg: msg,
    });
    if (!contact)
      return res.status(200).json({ status: 0, msg: "Data not save" });
    return res.status(200).json({ status: 1, data: contact });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something error");
  }
};

exports.getContact = async (req, res) => {
  try {
    const contactData = await contactModel.find();
    if (!contactData)
      return res.status(200).json({ status: 0, msg: "Data not found" });
    if (contactData.length < 1)
      return res.status(200).json({ status: 0, msg: "Data not found" });
    return res.status(200).json({ status: 1, data: contactData });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something error");
  }
};
