const jwt = require("jsonwebtoken");
const User = require("../models/User");


const protect = async (req, res, next) => {
    let token;

    try{

        //checking token in header of request
        if(req.headers.authorization
        ) {
            token = req.headers.authorization;

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user 
            req.user = await User.findById(decoded.id).select("-password");

            next ();
        } else {
            return res.status(401).json({message: "Not authorized, no token"})
        }
    } catch (err) {
        res.status(401).json({message: "Not authorized, token failed"})
    }
};

module.exports = protect;