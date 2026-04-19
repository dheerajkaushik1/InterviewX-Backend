const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    role:{
        type: String,
        enum: ["frontend", "backend", "mern"],
        required: true,
    }, 
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true,
    },
    question:{
        type: String,
        required: true,
    },
    }, 
    {
        timestamps: true
    }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;