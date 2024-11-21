const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    personalDetails: {
        name: {
            firstname: { type: String, required: true },
            middlename: { type: String, required: false },
            lastname: { type: String, required: true },
        },
        gender: { type: String, required: true },
        age: { type: Number, required: true },
        contact: {
            email: { type: String, required: true },
            phoneNo: { type: String, required: true },
            recoveryEmail: { type: String, required: false }
        },
        password: { type: String, required: true },
        idProof: {
            type: { type: String, required: true },
            number: { type: String, required: true }
        },
        permanentAddress: {
            addressLine: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pinCode: { type: String, required: true }
        },
    },
    twoFactorAuth: {
        enabled: { type: Boolean, required: true },
        method: { type: String, required: true }
    },
    skills: [{ type: String, required: true }],
    areaOfExpertise: [{ type: String, required: true }],
    resume: {
        filename: { type: String, required: true },
        fileType: { type: String, required: true },
        data: { type: Buffer, required: true }
    },
    yearsOfExperience: { type: Number, required: true },
    qualifications: [
        {
            degree: { type: String, required: true },
            institute: { type: String, required: true },
            yearOfAdmission: { type: Number, required: true },
            yearOfCompletion: { type: Number, required: true }
        }
    ],
    projects: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
            skillsGained: [{ type: String, required: true }]
        }
    ],
    researchPapers: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
            skills: [{ type: String, required: true }], 
            link: { type: String, required: false }
        }
    ],
    skillRelevancyScore: {
        skills: { type: Number, required: false },
        yearsOfExperience: { type: Number, required: false },
        qualification: { type: Number, required: false },
        researchPapers: { type: Number, required: false },
        projects: { type: Number, required: false },
        total: { type: Number, required: false }
    },
    approachRelevancyScore: {
        problemSolving: { type: Number, required: false },
        collaboration: { type: Number, required: false },
        decisionMaking: { type: Number, required: false },
        creativity: { type: Number, required: false },
        analyticalDepth: { type: Number, required: false },
        total: { type: Number, required: false }
    },
    finalScore: { type: Number, required: false }
});

module.exports = mongoose.model('Candidate', candidateSchema);




// const mongoose = require('mongoose');

// const candidateSchema = new mongoose.Schema({
//     name: {
//         firstname: {
//             type: String,
//             required: true
//         },
//         middlename: {
//             type: String,
//             required: false
//         },
//         lastname: {
//             type: String,
//             required: true
//         }
//     },
//     role: {
//         type: String,
//         default: "Candidate"
//     },
//     age: {
//         type: Number,
//         required: true
//     },
//     gender: {
//         type: String,
//         required: true
//     },
//     idProof: {
//         type: {
//             type: String,
//             required: true
//         },
//         number: {
//             type: String,
//             required: true
//         }
//     },
//     contactInformation: {
//         email: {
//             type: String,
//             required: true
//         },
//         phone: {
//             type: String,
//             required: true
//         }
//     },
//     address: {
//         addressLine: {
//             type: String,
//             required: true
//         },
//         city: {
//             type: String,
//             required: true
//         },
//         state: {
//             type: String,
//             required: true
//         },
//         pinCode: {
//             type: String,
//             required: true
//         }
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     twoFactorAuthentication: {
//         enabled: {
//             type: Boolean,
//             required: true
//         },
//         method: {
//             type: String,
//             required: true
//         }
//     },
//     candidateProfile: {
//         qualification:{
//             type: String,
//             required: true
//         },
//         criticalInputs: {
//             resume: {
//                 filename: {
//                     type: String,
//                     required: true,  // Required validation for filename
//                 },
//                 fileType: {
//                     type: String,
//                     required: true,  // Required validation for file type
//                 },
//                 data: {
//                     type: Buffer,
//                     required: true,  // Store file data in binary format
//                 }

//             },
//             skills: [
//                 {
//                     type: String,
//                     required: true
//                 }
//             ],
//             areaOfExpertise: [
//                 {
//                     type: String,
//                     required: true
//                 }
//             ]
//         },
//         additionalInputs: {
//             publications: [
//                 {
//                     title: {
//                         type: String,
//                         required: true
//                     },
//                     link: {
//                         type: String,
//                         required: false
//                     },
//                     description: {
//                         type: String,
//                         required: true
//                     }
//                 }
//             ],
//         }
//     },
//     candidateScore: {
//         type: Number,
//         required: false
//     },
//     candidateInterviews: [
//         {
//             interviewId: {
//                 type: String,
//                 required: true
//             },
//             performanceReport: {
//                 technicalKnowledge: {
//                     scores: [
//                         {
//                             type: Number,
//                             required: true
//                         }
//                     ],
//                     feedback: {
//                         type: String,
//                         required: true
//                     },
//                     total: {
//                         type: Number,
//                         required: true
//                     }
//                 },
//                 problemSolvingSkills: {
//                     scores: [
//                         {
//                             type: Number,
//                             required: true
//                         }
//                     ],
//                     feedback: {
//                         type: String,
//                         required: true
//                     },
//                     total: {
//                         type: Number,
//                         required: true
//                     }
//                 },
//                 researchAndProjecterience: {
//                     scores: [
//                         {
//                             type: Number,
//                             required: true
//                         }
//                     ],
//                     feedback: {
//                         type: String,
//                         required: true
//                     },
//                     total: {
//                         type: Number,
//                         required: true
//                     }
//                 },
//                 communicationSkills: {
//                     scores: [
//                         {
//                             type: Number,
//                             required: true
//                         }
//                     ],
//                     feedback: {
//                         type: String,
//                         required: true
//                     },
//                     total: {
//                         type: Number,
//                         required: true
//                     }
//                 },
//                 leadershipAndTeamworkActivities: {
//                     scores: [
//                         {
//                             type: Number,
//                             required: true
//                         }
//                     ],
//                     feedback: {
//                         type: String,
//                         required: true
//                     },
//                     total: {
//                         type: Number,
//                         required: true
//                     }
//                 },
//                 generalAptitudeAndPersonality: {
//                     scores: [
//                         {
//                             type: Number,
//                             required: true
//                         }
//                     ],
//                     feedback: {
//                         type: String,
//                         required: true
//                     },
//                     total: {
//                         type: Number,
//                         required: true
//                     }
//                 },
//                 gateScore: {
//                     type: Number,
//                     required: false
//                 }
//             },
//             finalScore: {
//                 type: Number,
//                 required: false
//             },
//             finalResult: {
//                 type: String,
//                 required: true
//             }
//         }
//     ]
// });

// module.exports = mongoose.model('Candidate', candidateSchema);


