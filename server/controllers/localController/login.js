const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Expert = require("../../model/expert");
const Candidate = require("../../model/candidate");
const htmlBody = require("../../assets/htmlBodies/TwoFactorAuth");
const email_sender = require("./emailSender");

const randomOtpGenerator = async () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const masterAuth = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
        success: false,
      });
    }

    const findExistingExpert = await Expert.findOne({
      "personalDetails.contact.email": email,
    });
    const findExistingCandidate = await Candidate.findOne({
      "personalDetails.contact.email": email,
    });

    if (!findExistingExpert && !findExistingCandidate) {
      return res.status(404).json({
        message: "User not found or wrong credentials.",
        success: false,
      });
    }

    let isPasswordMatch = false;

    if (findExistingExpert) {
      isPasswordMatch = await bcrypt.compare(
        password,
        findExistingExpert.personalDetails.password
      );
      if (!isPasswordMatch) {
        return res.status(401).json({
          message: "Incorrect Expert password. Please try again.",
          success: false,
        });
      }
    }

    if (findExistingCandidate) {
      isPasswordMatch = await bcrypt.compare(
        password,
        findExistingCandidate.personalDetails.password
      );
      if (!isPasswordMatch) {
        return res.status(401).json({
          message: "Incorrect Candidate password. Please try again.",
          success: false,
        });
      }
    }

    if (
      (findExistingCandidate && findExistingCandidate.twoFactorAuth?.enabled) ||
      (findExistingExpert && findExistingExpert.twoFactorAuth?.enabled)
    ) {
      const twoFACode = randomOtpGenerator();

      if (findExistingCandidate) {
        findExistingCandidate.twoFactorAuth.method = twoFACode;
        await findExistingCandidate.save();
      } else if (findExistingExpert) {
        findExistingExpert.twoFactorAuth.method = twoFACode;
        await findExistingExpert.save();
      }

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
          message: "Error during 2FA process.",
          success: false,
        });
      }
    }

    return res.status(200).json({
      message: "Login successful.",
      success: true,
      role: findExistingCandidate
        ? findExistingCandidate.personalDetails.role
        : findExistingExpert.personalDetails.role,
      response: findExistingCandidate
        ? findExistingCandidate
        : findExistingExpert,
    });
  } catch (error) {
    console.error("Error Making a Master Login", error);
    res
      .status(500)
      .json({ message: "Error Making Master login", success: false });
  }
});

module.exports = { masterAuth };
