const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        subject: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: ["diagnostic", "adaptive"],
            default: "diagnostic"
        },

        score: {
            type: Number,
            required: true
        },

        totalQuestions: {
            type: Number,
            required: true
        },

        weakTopics: {
            type: [String],
            default: []
        },

        answers: {
            type: [
                {
                    questionId: mongoose.Schema.Types.ObjectId,
                    selectedAnswer: String,
                    correct: Boolean
                }
            ],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Assessment", assessmentSchema);