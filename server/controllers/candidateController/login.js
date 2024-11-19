const Candidate = require("../../model/candidate");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addCandidate = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false,
            });
        }

    // Check if the email already exists
    const existingCandidate = await Candidate.findOne({
      "contactInformation.email": email,
    });

    if (existingCandidate) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

        // Hash the password
        // const hashedPassword = 
        console.log("Hashed password:", hashedPassword); // Debugging log

        // Create a new candidate
        const newCandidate = new Candidate({
            name: {
                firstname: "Default",
                middlename: "",
                lastname: "User",
            },
            password: bcrypt.hashSync(password, 10),
            age: 0,
            gender: "Not Specified",
            idProof: {
                type: "Not Provided",
                number: "Not Provided",
            },
            contactInformation: {
                email: email,
                phone: "0000000000",
            },
            address: {
                addressLine: "Default Address",
                city: "Default City",
                state: "Default State",
                pinCode: "000000",
            },
            securityQuestions: [
                {
                    question: "Default Question",
                    answer: "Default Answer",
                },
            ],
            twoFactorAuthentication: {
                enabled: false,
                method: "None",
            },
            candidateProfile: {
                profession: "Unemployed",
                professionCategory: "General",
                educationDetails: [],
                criticalInputs: {
                    resume: "Not Provided",
                    skills: [],
                    experienceArea: [],
                },
                additionalInputs: {
                    certifications: [],
                    portfolioLinks: [],
                    publications: [],
                    languagesKnown: [],
                    professionalProfiles: [],
                },
            },
            candidateScore: 0,
            candidateInterviews: [],
        });

        console.log("Candidate object before saving:", newCandidate); // Debugging log

    // Save the candidate to the database
    await newCandidate.save();

    return res.status(201).json({
      message: "Candidate registered successfully",
      success: true,
      data: {
        email: newCandidate.contactInformation.email,
        id: newCandidate._id,
      },
    });
  } catch (error) {
    console.error("Error registering candidate:", error);

    return res.status(500).json({
      message: "An error occurred while registering the candidate",
      success: false,
      error: error.message,
    });
  }
});



const loginCandidate = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: "email and password not provided",
        success: false,
      });
    }

    const candidate = await Candidate.findOne({
      "contactInformation.email": email,
    });
    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
        success: false,
      });
    }

    const isPasswordMatch = bcrypt.compareSync(password, candidate.password);
    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          id: candidate._id,
          email: candidate.contactInformation.email,
          role: candidate.role
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
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
      return res.status(404).json({
        message: "Invalid Password",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while logging in the candidate",
      success: false,
    });
  }
});

const signoutCandidate = asyncHandler(async (req, res) => {
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
        console.error("Error signout candidate :-: ", error);
        res.status(500).json({
            message: "Error signout candidate",
            success: false,
        });
    }
});

module.exports = { addCandidate, loginCandidate, signoutCandidate };
