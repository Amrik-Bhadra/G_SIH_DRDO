const express = require("express");
const router = express.Router();
const validator = require("../controllers/localController/validator");
const {
  forgotPassword_email_sender,
  otpVerification,
  newPasswordMaking,
} = require("../controllers/expertController/forgotPassword");

router.get("/validate", validator);

// forgot password Routes..> both {expert and candidate}
router.post("/forgotpass", forgotPassword_email_sender);
router.post("/otpVerify/:email", otpVerification);
router.post("/newPassword/:email", newPasswordMaking);
module.exports = router;
