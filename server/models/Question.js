const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true
        },

        topic: {
            type: String,
            required: true
        },

        concept: {
            type: String,
            required: true
        },

        question: {
            type: String,
            required: true
        },

        options: {
            type: [String],
            required: true
        },

        correctAnswer: {
            type: String,
            required: true
        },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "easy"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Question", questionSchema);