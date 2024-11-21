const mongoose = require("mongoose");

const optionCategorySchema = new mongoose.Schema({
  problemSolving: { type: Number, required: true },
  collaboration: { type: Number, required: true },
  decisionMaking: { type: Number, required: true },
  creativity: { type: Number, required: true },
  analyticalDepth: { type: Number, required: true },
});

const optionSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  category: { type: optionCategorySchema, required: true },
  isSelected: { type: Boolean, required: true, default: false },
});

const questionSchema = new mongoose.Schema({
  head: { type: String, required: true },
  options: {
    type: [optionSchema],
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
