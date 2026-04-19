const {GoogleGenerativeAI} = require('@google/generative-ai');
const Interview = require('../models/Interview');
const dotenv = require('dotenv');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const evaluateAnswer = async (req, res) => {
    const {question, answer} = req.body;    

    try{
        const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});

        const prompt = `
            You are a technical interviewer.

            Evaluate the condidate's answer.

            Question: ${question}
            Answer: ${answer}

            Return ONLY JSON in this format:
            {
                "score": number (out of 10),
                "strengths": ["point1", "point2"],
                "weaknesses": ["point1", "point2"],
                "suggestions": ["point1", "point2"]
            }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        let parsed;
        const cleanText = text.replace(/```json|```/g, "").trim();
        try{
            parsed = JSON.parse(cleanText);
        } catch {
            parsed = {raw: text};
        }

        const newInterview = await Interview.create({
            user: req.user._id,
            role: req.body.role,
            difficulty: req.body.difficulty,
            question,
            answer,
            feedback: parsed,
        });

        res.json({
            message: "Evaluation Complete",
            data: newInterview,
        });

    } catch (err){
        res.status(500).json({message: "evaluate Answer error",
            error: err.message
        });
    }
};

module.exports = evaluateAnswer;