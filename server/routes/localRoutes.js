const express = require("express");
const router = express.Router();
const validator = require("../controllers/localController/validator");

router.get("/validate", validator);

module.exports = router;
