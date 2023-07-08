const express = require("express");
const router = express.Router();
const { contact, getContact } = require("./../controllers/contactController");
router.post("/contact", contact);
router.get("/contact", getContact);

module.exports = router;
