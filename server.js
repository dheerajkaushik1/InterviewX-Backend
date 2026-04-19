const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDb = require('./config/db');   
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const aiRoutes = require('./routes/aiRoutes');
const interviewRoutes = require('./routes/interviewRoutes');

connectDb();

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Auth Routes
app.use("/api/auth", authRoutes);

//User Routes
app.use("/api/users", userRoutes);

//Question Routes
app.use("/api/question", questionRoutes);

//AI Routes
app.use("/api/ai", aiRoutes);

//Interview Routes
app.use("/api/interviews", interviewRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to InterviewX API");
})

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})