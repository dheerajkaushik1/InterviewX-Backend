const Question = require('../models/Question');

// Add Question
const addQuestion = async (req, res) => {
    const {role, difficulty, question, questions} = req.body;

    try{
        if(question){
            const newQuestion = await Question.create({
            role,
            difficulty,
            question,
        });

        res.status(201).json({message: "Question Added",
            Question: newQuestion
        });
        }

        if(questions && questions.length > 0){
            const formattedQuestions = questions.map((q) => ({
                role,
                difficulty,
                question: q,
            }));

            const inserted = await Question.insertMany(formattedQuestions);

            return res.status(201).json({
                message: "Bulk Questions Added",
                questions: inserted,
                count: inserted.length,
            });
        }
    } catch (err) {
        res.status(500).json({message: "Add Question Failed!",
            error: err.message
        });
    }
};

// Get Question

const getQuestions = async (req, res) => {
    const {role, difficulty} = req.query;
    
    try{
        const questions = await Question.find({role, difficulty}).limit(5);

        res.json(questions);
    } catch (err) {
        res.stauts(500).json({message: "Get Questions Error",
            error: err.message
        });
    }
};

module.exports = {
    addQuestion,
    getQuestions,
}