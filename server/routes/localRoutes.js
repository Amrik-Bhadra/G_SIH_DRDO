const express = require("express");
const router = express.Router();
const validator = require("../controllers/localController/validator");
// const { uploadFile, getFile } = require("../controllers/localController/fileController");
const upload = require("../db/uploadconfig")

const {
  forgotPassword_email_sender,
  otpVerification,
  newPasswordMaking,
} = require("../controllers/localController/forgotPassword");
const {
  TwoFactVerification,
} = require("../controllers/expertController/logSign");
const apiLimiter = require("../middleware/apiLimiter");

//File Routes
// router.post("/upload", upload.single("file"), uploadFile);
// router.get("/:id", getFile);

router.get("/validate", validator);

// forgot password Routes..> both {expert and candidate}
router.post("/forgotpass", forgotPassword_email_sender);
router.post("/otpVerify/:email", otpVerification);
router.post("/newPassword/:email", newPasswordMaking);

// 2FA Authentication Route
router.post("/2fa/verify/:id", apiLimiter, TwoFactVerification);

module.exports = router;
