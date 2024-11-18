const mongoose = require("mongoose");
const Expert = require("../../model/expert");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// PRIVATE ROUTE
// http://localhost:8000/api/expert/all
const allExperts = asyncHandler(async (req, res) => {
  try {
    const experts = await Expert.find(
      {},
      {
        password: 0,
        expertProfile: {
          additionalInputs: {
            // removed the publications {as per shivam suggestions}
            publications: 0,
          },
        },
      }
    );
    if (!experts.length) {
      return res.status(404).json({
        message: "No experts data is available",
        success: false,
      });
    }
    res.status(200).json(experts);
  } catch (error) {
    console.log("Error fetching all experts :-: ", error);
    res.status(500).json({ message: "Error fetching all experts" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/expert/update
const updateExperts = asyncHandler(async (req, res) => {
  try {
    const expertId = req.params.id;
    const expertData = req.body;
    if (expertData.password) {
      delete expertData.password;
    }

    const expert = await Expert.findByIdAndUpdate(
      expertId,
      { $set: expertData },
      { new: true }
    );
    if (!expert) {
      return res.status(404).json({
        message: "Expert not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Expert updated successfully",
      success: true,
      data: expert,
    });
  } catch (error) {
    console.log("Error fetching all experts :-: ", error);
    res.status(500).json({ message: "Error fetching all experts" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/expert/find
const findExpert = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(typeof id);
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid or missing Expert ID",
        success: false,
      });
    }
    const expert = await Expert.findById(id, {
      password: 0,
      expertProfile: {
        additionalInputs: {
          // removed the publications {as per shivam suggestions}
          publications: 0,
        },
      },
    });

    if (!expert) {
      return res.status(404).json({
        message: `Unable to fetch the expert with id :-: ${id}`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Expert fetched successfully",
      success: true,
      data: expert,
    });
  } catch (error) {
    console.log(`Error fetching experts with ${id} :-:\n\n `, error);
    res.status(500).json({ message: "Error fetching all experts" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/expert/signin
const createExpert = asyncHandler(async (req, res) => {
  try {
    const { name, password, email, phone, designation, field } = req.body;

    const existingExpert = await Expert.findOne({
      $or: [
        { "contactInformation.email": email },
        { "contactInformation.phone": phone },
      ],
    });

    if (existingExpert) {
      return res.status(400).json({
        message: "Expert with this email or phone already exists",
        success: false,
      });
    }

    const newExpert = new Expert({
      name,
      password: bcrypt.hashSync(password, 10),
      contactInformation: {
        email,
        phone,
      },
      designation,
      field,
      expertProfile: {
        yearsOfExperience: 0,
        educationDetails: [],
        criticalInputs: {
          resume: "",
          skills: [],
          expertise: [],
        },
        additionalInputs: {
          certifications: [],
          portfolioLinks: [],
          publications: [],
          languagesKnown: [],
          professionalProfiles: [],
          professionalAffiliations: [],
        },
      },
      expertScore: 0,
    });

    await newExpert.save();

    res.status(201).json({
      message: "Expert created successfully",
      success: true,
      data: newExpert,
    });
  } catch (error) {
    console.error("Error creating expert :-: ", error);
    res.status(500).json({
      message: "Error creating expert",
      success: false,
    });
  }
});

const loginExpert = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "email and password not provided",
        success: false,
      });
    }

    // find the user with the credintials
    const findExistingUser = await Expert.findOne({
      "contactInformation.email": email,
    });

    if (!findExistingUser) {
      return res.status(404).json({
        message: "User Not Found or Wrong Credintials",
        success: false,
      });
    }

    const isPasswordMatch = bcrypt.compareSync(
      password,
      findExistingUser.password
    );
    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          id: findExistingUser._id,
          email: findExistingUser.contactInformation.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
        sameSite: "Strict",
      });

      return res.status(201).json({
        message: "User Successfully Logined",
        success: true,
      });
    } else {
      return res.status(403).json({
        message: "Wrong Password!, Re-Check the password",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error login expert :-: ", error);
    res.status(500).json({
      message: "Error login expert",
      success: false,
    });
  }
});

const signoutExpert = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "User successfully signed out",
      success: true,
    });
  } catch (error) {
    console.error("Error signout expert :-: ", error);
    res.status(500).json({
      message: "Error signout expert",
      success: false,
    });
  }
});

module.exports = {
  allExperts,
  findExpert,
  createExpert,
  updateExperts,
  loginExpert,
  signoutExpert
};
