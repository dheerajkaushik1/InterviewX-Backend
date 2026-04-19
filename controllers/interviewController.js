const Interview = require('../models/Interview');

//Get user interview history
const getMyInterviews = async (req, res) => {
    try{
        const interviews = await Interview.find({user: req.user._id}).sort({createdAt: -1});

        res.json(interviews);
    } catch (err) {
        rse.status(500).json({message: "Error fetching interviews",
            error: err.message,
        });
    }
};

module.exports = getMyInterviews;