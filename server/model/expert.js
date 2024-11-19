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
        type: String,
        default: "No resume provided",
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
    },
  },
  expertScore: {
    type: Number,
  },
});

module.exports = mongoose.model("Expert", expertSchema);
