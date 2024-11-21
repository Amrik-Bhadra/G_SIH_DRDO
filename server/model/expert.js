const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  personalDetails: {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
        required: false,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    contact: {
      email: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        required: true,
      },
      recoveryEmail: {
        type: String,
        required: false,
      },
    },
    password: {
      type: String,
      required: true,
    },
    idProof: {
      type: {
        type: String,
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
    },
  },
  fieldOfExpertise: {
    domain: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    qualifications: [
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
    projects: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        skillsGained: [
          {
            type: String,
            required: true,
          },
        ],
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
          required: false,
        },
        year: {
          type: Number,
          required: true,
        },
        skills: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
    resume: {
      filename: {
        type: String,
        required: true,
      },
      fileType: {
        type: String,
        required: true,
      },
      data: {
        type: Buffer,
        required: true,
      },
    },
  },
  availability: {
    type: Boolean,
    default: true,
  },
  skillRelevancyScore: {
    skills: {
      type: Number,
      default: 0,
    },
    yearsOfExperience: {
      type: Number,
      default: 0,
    },
    qualifications: {
      type: Number,
      default: 0,
    },
    researchPapers: {
      type: Number,
      default: 0,
    },
    projects: {
      type: Number,
      default: 0,
    },
    totalSkillRelevancyScore: {
      type: Number,
      default: 0,
    },
  },
  approachRelevancyScore: {
    problemSolving: {
      type: Number,
      default: 0,
    },
    collaboration: {
      type: Number,
      default: 0,
    },
    decisionMaking: {
      type: Number,
      default: 0,
    },
    creativity: {
      type: Number,
      default: 0,
    },
    analyticalDepth: {
      type: Number,
      default: 0,
    },
    totalApproachRelevancyScore: {
      type: Number,
      default: 0,
    },
  },
  finalScore: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Expert", expertSchema);



// const mongoose = require("mongoose");

// const expertSchema = new mongoose.Schema({
//   name: {
//     firstname: {
//       type: String,
//       required: true,
//     },
//     middlename: {
//       type: String,
//       required: true,
//     },
//     lastname: {
//       type: String,
//       required: true,
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   gender:{
//     type:String,
//     required:true
//   },
//   twoFactorAuthentication: {
//     twoFacAuth: {
//       type: Boolean,
//       default: true,
//     },
//     code: {
//       type: String,
//     },
//   },
//   role: { type: String, default: "Expert" },
//   otp: { type: String },
//   otpExpiry: { type: Date },
//   contactInformation: {
//     email: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//     },
//   },
//   designation: {
//     type: String,
//     required: true,
//   },
//   expertProfile: {
//     yearsOfExperience: {
//       type: Number,
//       required: true,
//     },
//     qualification: [
//       {
//         degree: {
//           type: String,
//           required: true,
//         },
//         institution: {
//           type: String,
//           required: true,
//         },
//         yearOfCompletion: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     criticalInputs: {
//         resume: {
//           filename: {
//               type: String,
//               required: true,  // Required validation for filename
//           },
//           fileType: {
//               type: String,
//               required: true,  // Required validation for file type
//           },
//           data: {
//               type: Buffer,
//               required: true,  // Store file data in binary format
//           }
//       },
//       skills: [
//         {
//           type: String,
//         },
//       ],
//       expertise: [
//         {
//           type: String,
//         },
//       ],
//     },
//     additionalInputs: {
//       publications: [
//         {
//           title: {
//             type: String,
//             required: true,
//           },
//           link: {
//             type: String,
//             required: true,
//           },
//           description: {
//             type: String,
//             required: true,
//           },
//           skills:{
//             type: String,
//             required:true,
//           }
//         },
//       ],
//       projects:[
//         {
//           title: {
//             type: String,
//             required: true,
//           },
//           description:{
//             type: String,
//             required: true,
//           },
//           skills:{
//             type: String,
//             required:true,
//           }
//         }
//       ]
//     },
//     approachAssessment: {
//       problemSolvingApproach: {
//         type: Number,
//       },
//       decisionMakingStyle: {
//         type: Number,
//       },
//       creativityAndInnovation: {
//         type: Number,
//       },
//       analyticalDepth: {
//         type: Number,
//       },
//       collaborationPreference: {
//         type: Number,
//       },
//     },
//   },
//   expertScore: {
//     type: Number,
//   },
//   availiability:{
//     type: Boolean,
//     default: true,
//   },
// });

// module.exports = mongoose.model("Expert", expertSchema);
