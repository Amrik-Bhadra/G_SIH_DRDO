const mongoose = require("mongoose");

const interviewScoresSchema = new mongoose.Schema({
    panelId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Panel" },
    scores: [{
        candidateId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Candidate" },
        technicalKnowledge: {
            fundamentalKnowledge: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            applicationKnowledge: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },  
            currentTrends: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            defenceTechnologies: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            totalScore: { type: Number, default: 0 },
        },
        problemSolving: {
            problemSolvingApproach: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            logicalReasoning: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            abilityToSolveComplexIssues: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            totalScore: { type: Number, default: 0 },
        },
        researchAndProjectExperience: {
            qualityOfResearchWork: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            practicalExperience: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            handsOnExperience: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            totalScore: { type: Number, default: 0 },
        },
        communicationSkills: {
            qualityOfSpeaking: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            abilityToExplain: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            listeningSkills: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            totalScore: { type: Number, default: 0 },
        },
        leadershipAndTeamworkAbilities: {
            collaborativeWork: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            leadershipPotential: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            collaborativeThinking: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            totalScore: { type: Number, default: 0 },
        },
        generalAptitude: {
            willingnessToLearn: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            stressHandling: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            generalDemeanor: {
                question: { type: String, required: true },
                score: { type: Number, default: 0 },
            },
            totalScore: { type: Number, default: 0 },
        },
        overallScore: { type: Number, default: 0 },
    }],
});

module.exports = mongoose.model("InterviewScores", interviewScoresSchema);
