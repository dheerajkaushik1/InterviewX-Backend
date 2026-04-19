const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: String,
    difficulty: String,

    question: String,
    answer: String,

    feedback: {
        Score: Number,
        strengths: [String],
        weaknesses: [String],
        suggestions: [String], 
    },
},
{
    timestamps: true
}
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;