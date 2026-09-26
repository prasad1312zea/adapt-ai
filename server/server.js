const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const performanceRoutes = require("./routes/performanceRoutes");
const questionRoutes = require("./routes/questionRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const adaptiveRoutes = require("./routes/adaptiveRoutes");
const quizRoutes = require("./routes/quizRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "ADAPT.AI Backend is running 🚀"
    });
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/adaptive", adaptiveRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB connection failed:", error.message);
    });