const express = require("express");
const router = express.Router();
const validator = require("../controllers/localController/validator");
const {
  forgotPassword_email_sender,
  otpVerification,
  newPasswordMaking,
} = require("../controllers/localController/forgotPassword");
const {
  TwoFactVerification,
} = require("../controllers/expertController/logSign");
const apiLimiter = require("../middleware/apiLimiter");

router.get("/validate", validator);

// forgot password Routes..> both {expert and candidate}
router.post("/forgotpass", forgotPassword_email_sender);
router.post("/otpVerify/:email", otpVerification);
router.post("/newPassword/:email", newPasswordMaking);

// 2FA Authentication Route
router.post("/2fa/verify/:id", apiLimiter, TwoFactVerification);

module.exports = router;
