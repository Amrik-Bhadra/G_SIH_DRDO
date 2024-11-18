const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        firstname: {
            type: String,
            required: true
        },
        middlename: {
            type: String,
            required: false
        },
        lastname: {
            type: String,
            required: true
        }
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    idProof: {
        type: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        }
    },
    contactInformation: {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    address: {
        addressLine: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pinCode: {
            type: String,
            required: true
        }
    },
    avatar: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    securityQuestions: [
        {
            question: {
                type: String,
                required: true
            },
            answer: {
                type: String,
                required: true
            }
        }
    ],
    twoFactorAuthentication: {
        enabled: {
            type: Boolean,
            required: true
        },
        method: {
            type: String,
            required: true
        }
    },
    candidateProfile: {
        profession: {
            type: String,
            required: true
        },
        professionCategory: {
            type: String,
            required: true
        },
        educationDetails: [
            {
                degree: {
                    type: String,
                    required: true
                },
                institution: {
                    type: String,
                    required: true
                },
                yearOfStarting: {
                    type: Number,
                    required: true
                },
                yearOfCompletion: {
                    type: Number,
                    required: true
                }
            }
        ],
        criticalInputs: {
            resume: {
                type: String,
                required: true
            },
            skills: [
                {
                    type: String,
                    required: true
                }
            ],
            experienceArea: [
                {
                    type: String,
                    required: true
                }
            ]
        },
        additionalInputs: {
            certifications: [
                {
                    name: {
                        type: String,
                        required: true
                    },
                    issuedBy: {
                        type: String,
                        required: true
                    },
                    year: {
                        type: Number,
                        required: true
                    },
                    link: {
                        type: String,
                        required: false
                    }
                }
            ],
            portfolioLinks: [
                {
                    type: String,
                    required: false
                }
            ],
            publications: [
                {
                    title: {
                        type: String,
                        required: true
                    },
                    link: {
                        type: String,
                        required: false
                    },
                    year: {
                        type: Number,
                        required: true
                    }
                }
            ],
            languagesKnown: [
                {
                    type: String,
                    required: true
                }
            ],
            professionalProfiles: [
                {
                    platform: {
                        type: String,
                        required: true
                    },
                    url: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    },
    candidateScore: {
        type: Number,
        required: false
    },
    candidateInterviews: [
        {
            interviewId: {
                type: String,
                required: true
            },
            performanceReport: {
                technicalKnowledge: {
                    scores: [
                        {
                            type: Number,
                            required: true
                        }
                    ],
                    feedback: {
                        type: String,
                        required: true
                    },
                    total: {
                        type: Number,
                        required: true
                    }
                },
                problemSolvingSkills: {
                    scores: [
                        {
                            type: Number,
                            required: true
                        }
                    ],
                    feedback: {
                        type: String,
                        required: true
                    },
                    total: {
                        type: Number,
                        required: true
                    }
                },
                researchAndProjectExperience: {
                    scores: [
                        {
                            type: Number,
                            required: true
                        }
                    ],
                    feedback: {
                        type: String,
                        required: true
                    },
                    total: {
                        type: Number,
                        required: true
                    }
                },
                communicationSkills: {
                    scores: [
                        {
                            type: Number,
                            required: true
                        }
                    ],
                    feedback: {
                        type: String,
                        required: true
                    },
                    total: {
                        type: Number,
                        required: true
                    }
                },
                leadershipAndTeamworkActivities: {
                    scores: [
                        {
                            type: Number,
                            required: true
                        }
                    ],
                    feedback: {
                        type: String,
                        required: true
                    },
                    total: {
                        type: Number,
                        required: true
                    }
                },
                generalAptitudeAndPersonality: {
                    scores: [
                        {
                            type: Number,
                            required: true
                        }
                    ],
                    feedback: {
                        type: String,
                        required: true
                    },
                    total: {
                        type: Number,
                        required: true
                    }
                },
                gateScore: {
                    type: Number,
                    required: false
                }
            },
            finalScore: {
                type: Number,
                required: false
            },
            finalResult: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Candidate', candidateSchema);
