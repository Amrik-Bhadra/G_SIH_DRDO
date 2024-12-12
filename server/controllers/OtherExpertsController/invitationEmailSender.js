const asyncHandler = require("express-async-handler");
const email_sender = require("../localController/emailSender");
const crypto = require("crypto");
const htmlBody = require("../../assets/htmlBodies/emailInvite");
const Expert = require("../../model/expert");

const InvitationEmailSender = asyncHandler(async (req, res) => {
  const { experts, date } = req.body;

  if (!experts || !Array.isArray(experts) || experts.length === 0) {
    return res.status(400).json({
      message: "No experts data provided or the data is not an array",
      success: false,
    });
  }

  try {
    const sender = process.env.appEmail;

    const emailPromises = experts.map(async (expert) => {
      const {
        personalDetails: {
          contact: { email },
        },
      } = expert;

      if (!email) {
        throw new Error(
          `Expert data is missing an email field: ${JSON.stringify(expert)}`
        );
      }

      // Validate qualifications, projects, publications (ensure they are objects)
      if (
        !Array.isArray(expert.fieldOfExpertise.qualifications) ||
        !Array.isArray(expert.fieldOfExpertise.projects) ||
        !Array.isArray(expert.fieldOfExpertise.publications)
      ) {
        throw new Error(
          "Qualifications, projects, and publications must be arrays of objects."
        );
      }

      const subject = `Heartfelt Welcome to ${email}`;
      const text = `Welcome Expert, We Welcome You For the Interview Panel Expert on this date: ${date}`;
      const htBody = htmlBody(token, date);

      // Create the new expert document and save it
      const newExpert = new Expert(expert);
      const savePromise = newExpert.save(); // Save expert to DB

      // Send email asynchronously
      const emailPromise = await email_sender(
        sender,
        email,
        subject,
        text,
        htBody
      ).catch((error) => {
        console.error(`Error sending email to ${email}: ${error.message}`);
        throw new Error(`Email failed for ${email}`);
      });

      await Promise.all([savePromise, emailPromise]);

      return true;
    });

    const results = await Promise.allSettled(emailPromises);

    const failedEmails = results
      .filter((result) => result.status === "rejected")
      .map((_, index) => experts[index].personalDetails.contact.email);

    if (failedEmails.length > 0) {
      return res.status(207).json({
        message: "Some emails failed to send",
        failedEmails,
        success: false,
      });
    }

    return res.status(200).json({
      message: "All invitations sent and experts saved successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error sending invitations:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
});

module.exports = { InvitationEmailSender };
