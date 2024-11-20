const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: {
    firstname: {
      type: String,
      required: true,
    },
    middlename: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  twoFactorAuthentication: {
    twoFacAuth: {
      type: Boolean,
      default: true,
    },
    code: {
      type: String,
    },
  },
  role: { type: String, default: "Expert" },
  otp: { type: String },
  otpExpiry: { type: Date },
  contactInformation: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  designation: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  expertProfile: {
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    educationDetails: [
      {
        degree: {
          type: String,
          required: true,
        },
        institution: {
          type: String,
          required: true,
        },
        yearOfCompletion: {
          type: Number,
          required: true,
        },
      },
    ],
    criticalInputs: {
      resume: {
        resume: {
          filename: {
              type: String,
              required: true,  // Required validation for filename
          },
          fileType: {
              type: String,
              required: true,  // Required validation for file type
          },
          data: {
              type: Buffer,
              required: true,  // Store file data in binary format
          }

      }
      },
      skills: [
        {
          type: String,
        },
      ],
      expertise: [
        {
          type: String,
        },
      ],
    },
    toolsAndPlatforms: [
      {
        type: String,
      },
    ],
    additionalInputs: {
      certifications: [
        {
          name: {
            type: String,
            required: true,
          },
          issuedBy: {
            type: String,
            required: true,
          },
          year: {
            type: Number,
            required: true,
          },
          description: {
            type: Number,
            required: true,
          },
        },
      ],
      portfolioLinks: [
        {
          type: String,
          required: true,
        },
      ],
      publications: [
        {
          title: {
            type: String,
            required: true,
          },
          link: {
            type: String,
            required: true,
          },
          year: {
            type: Number,
            required: true,
          },
        },
      ],
      languagesKnown: [
        {
          type: String,
          required: true,
        },
      ],
      professionalProfiles: [
        {
          platform: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
      professionalAffiliations: [
        {
          organization: {
            type: String,
            required: true,
          },
          membershipID: {
            type: String,
            required: true,
          },
          yearJoined: {
            type: Number,
            required: true,
          },
        },
      ],
      highestQualification: [
        {
          type: Number,
          required: true,
        },
      ],
    },
    approachAssessment: {
      problemSolvingApproach: {
        type: Number,
      },
      decisionMakingStyle: {
        type: Number,
      },
      creativityAndInnovation: {
        type: Number,
      },
      analyticalDepth: {
        type: Number,
      },
      analyticalDepth: {
        type: Number,
      },
      collaborationPreference: {
        type: Number,
      },
    },
  },
  expertScore: {
    type: Number,
  },
});

module.exports = mongoose.model("Expert", expertSchema);
