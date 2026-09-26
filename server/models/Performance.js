const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema(
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

        concepts: [
            {
                name: String,

                mastery: {
                    type: Number,
                    min: 0,
                    max: 100
                },

                status: {
                    type: String,
                    enum: ["weak", "learning", "mastered"],
                    default: "learning"
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Performance", performanceSchema);