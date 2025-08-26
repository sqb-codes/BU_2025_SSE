const jwt = require("jsonwebtoken");
const User = require("../model/User");

// Protect Routes
exports.protect = async (req, res, next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            return res.status(401).json({
                message: 'Not authorized'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }
        req.user = user;
        next();
    } catch(error) {
        console.error(error);
        res.status(401).json({
            message: 'Error while validating token...'
        })
    }
}


// Role based access
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({
                message: 'Access denied: you do not have permission'
            });
        }
        next();
    }
}