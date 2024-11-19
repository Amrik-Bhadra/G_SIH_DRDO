const mongoose = require("mongoose");

const DRDO_Dept_Category = {
  Aeronautics: "Aeronautics",
  ArmamentsAndCombatEngineering: "Armaments and Combat Engineering",
  ElectronicsAndCommunicationSystems: "Electronics and Communication Systems",
  MissileSystems: "Missile Systems",
  LifeSciences: "Life Sciences",
  MaterialsAndMetallurgy: "Materials and Metallurgy",
  NavalSystems: "Naval Systems",
  StrategicSystemsAndResources: "Strategic Systems and Resources",
  AdvancedTechnologies: "Advanced Technologies",
  ExplosivesFireAndSafety: "Explosives, Fire, and Safety",
  TestingAndEvaluation: "Testing and Evaluation",
};

const panelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  deptName: {
    type: String,
    required: true,
    enum: Object.values(DRDO_Dept_Category),
  },
  description: {
    type: String,
    required: true,
  },
  noOfExperts: {
    type: Number,
    required: true,
  },
  noOfCandidates: {
    type: Number,
    required: true,
  },
  candidateId: {
    type: [String],
  },
  expertIds: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["Pending", "Scheduled", "Completed", "Cancelled"],
    default: "Pending",
  },
  interviewDateAndTime: {
    date: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
  },
  location: {
    state: { type: String, default: "NA" },
    address: { type: String, default: "NA" },
    pincode: {
      type: String,
      required: true,
      default: "000000",
      validate: {
        validator: function (value) {
          return /^[1-9][0-9]{5}$/.test(value);
        },
        message: "Pincode must be a valid 6-digit number.",
      },
    },
  },
});

module.exports = mongoose.model("Panel", panelSchema);
