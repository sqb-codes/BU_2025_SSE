const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const createToken = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, JWT_SECRET, { expiresIn: '1d' });
};

// Register a new user
exports.registerUser = async(req, res) => {
    try {
        const {firstName, lastName, email, password, role} = req.body;
        // check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // create new user
        const newUser = new User({ firstName, lastName, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering User' });
    }
}

exports.loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        if (!email || !password) {
            return res.status(400).json({message: "Please provide email and password both"});
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({message: "Invalid email"});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(401).json({message: "Invalid Password"});
        }

        const token = createToken(user);
        res.status(200).json({
            status: "success",
            data: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error while login',
            error: error.message
        })
    }
}