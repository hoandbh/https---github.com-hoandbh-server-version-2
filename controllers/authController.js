const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const User = db.user;

const checkRequiredFields = (requiredFields, requestBody) => {
    const missingFields = [];
    for (const field of requiredFields) {
        if (!requestBody[field])
            missingFields.push(field);
    }
    return missingFields.length == 0;
};

const login = async (req, res) => {
    const requiredFields = ['user_name', 'password'];
    const allFieldsPresent = checkRequiredFields(requiredFields, req.body);
    if (!allFieldsPresent) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }
    const { user_name, password } = req.body;
    const foundUser = await User.findOne({ where: { user_name } });
    if (!foundUser) //|| !is_exist.active //if field activ is exist
        return res.status(401).json({ message: 'No user found'});
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch)
        return res.status(401).json({ message: 'Incorrect password' });
    const userInfo = {
        id: foundUser.id,
        username: foundUser.username,
        permission: foundUser.permission
    };
    //email?course??
    const accessToken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET);
    //res.setHeader('Authorization', `Bearer ${accessToken}`)//???
    res.json({accessToken});
}

const register = async (req, res) => {

    const requiredFields = ['user_name', 'email', 'password'];
    const allFieldsPresent = checkRequiredFields(requiredFields, req.body);

    if (!allFieldsPresent) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }
    const { user_name, email, password } = req.body;
    const duplicateUsername = await User.findOne({ where: { user_name} });
    if (duplicateUsername)
        return res.status(409).json({ message: 'Username already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ user_name, email, password: hashedPassword });

    if (user)
        return res.status(201).json(user);
    else
        return res.status(400).json({ message: 'Invalid user data received' });
}

module.exports = { login, register };
