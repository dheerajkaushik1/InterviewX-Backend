const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

//Register
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try{
        const userExists = await User.findOne({email});

        if (userExists){
            return res.json({message: "User already exists with this email"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.json({message: "User registered",
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({message: "Regisration failed",
            errMsg: err.message
        });
    }
};


//Login
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});  

        if(!user){
            return res.json({message: "User does not exist with this email."});
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (user && comparePass){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.json({message: "Invalid Credentials"});
        }
    } catch (err) {
        res.status(500).json({message: "Login Error",
            errMsg: err.message
        })
    }
};

module.exports = {
    registerUser,
    loginUser
}