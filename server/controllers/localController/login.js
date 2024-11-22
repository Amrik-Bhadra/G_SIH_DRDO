const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Expert = require("../../model/expert");
const Candidate = require("../../model/candidate");
const htmlBody = require("../../assets/htmlBodies/TwoFactorAuth");
const email_sender = require("./emailSender");

const randomOtpGenerator = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const masterAuth = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required.",
        success: false,
      });
    }

    const [findExistingExpert, findExistingCandidate] = await Promise.all([
      Expert.findOne({ "personalDetails.contact.email": email }),
      Candidate.findOne({ "personalDetails.contact.email": email }),
    ]);

    if (!findExistingExpert && !findExistingCandidate) {
      return res.status(404).json({
        message: "User not found or wrong credentials.",
        success: false,
      });
    }

    const user = findExistingExpert || findExistingCandidate;
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.personalDetails.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: `Incorrect ${findExistingExpert ? "Expert" : "Candidate"} password. Please try again.`,
        success: false,
      });
    }

    if (user.twoFactorAuth?.enabled) {
      const twoFACode = randomOtpGenerator();
      user.twoFactorAuth.method = twoFACode;
      await user.save();

      const sender = process.env.appEmail;
      const receiver = email;
      const subject = `Two-Factor Authentication Code for ${email}`;
      const text = `Your Code: ${twoFACode}`;
      const htBody = htmlBody(twoFACode);

      try {
        const send2FACode = await email_sender(
          sender,
          receiver,
          subject,
          text,
          htBody
        );

        if (!send2FACode) {
          return res.status(500).json({
            message: "Unable to send the two-factor authentication code.",
            success: false,
          });
        }

        return res.status(200).json({
          message: "2FA code sent successfully. Please verify to log in.",
          success: true,
        });
      } catch (err) {
        console.error("Error sending 2FA code:", err);
        return res.status(500).json({
          message: "Error during the 2FA process.",
          success: false,
        });
      }
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.personalDetails.contact.email,
        role: user.personalDetails.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1800000, // 30 minutes
      sameSite: "Strict",
    });

    return res.status(200).json({
      message: "Login successful.",
      success: true,
      role: user.personalDetails.role,
      response: user,
    });
  } catch (error) {
    console.error("Error making a master login:", error);
    res
      .status(500)
      .json({ message: "Error making master login.", success: false });
  }
});

module.exports = { masterAuth };
