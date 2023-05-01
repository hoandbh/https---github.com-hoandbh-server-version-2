const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const User = db.user;

const checkRequiredFields = (requiredFields, requestBody) => {
  const missingFields = [];
  for (const field of requiredFields) {
    if (requestBody[field]==undefined)
      missingFields.push(field);
  }
  // console.log('missingFields')
  // console.log(missingFields)
  return missingFields.length == 0;
};

const login = async (req, res) => {
  console.log(req.body)

  const requiredFields = ['email', 'password'];
  const allFieldsPresent = checkRequiredFields(requiredFields, req.body);
  if (!allFieldsPresent) {
    return res.status(400).json({
      message: 'All fields are required'   
    });
  }       
  const { email, password } = req.body;
  const foundUser = await User.findOne({ where: { email } });
  if (!foundUser) //|| !is_exist.active //if field activ is exist
    return res.status(401).json({ message: 'No user found'});
  const passwordMatch = await bcrypt.compare(password, foundUser.password);
  if (!passwordMatch)
    return res.status(401).json({ message: 'Incorrect password' });
  const userInfo = {
    id: foundUser.id,       
    username: foundUser.username,//??
    permission: foundUser.permission   
  };
  //email?course??
  const accessToken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET);
  //res.setHeader('Authorization', `Bearer ${accessToken}`)//???
  // res.json({accessToken});
  res.json({ user:{ firstName:foundUser.first_name, lastName:foundUser.last_name, id:foundUser.id, permission:foundUser.permission}, accessToken:accessToken})

}

const register = async (req, res) => {

  const requiredFields = ['first_name', 'last_name', 'email', 'password','permission'];
  const allFieldsPresent = checkRequiredFields(requiredFields, req.body);

  if (!allFieldsPresent) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }
  const { first_name, last_name, email, password, permission} = req.body;
  const duplicateEmail = await User.findOne({ where: { email} });
  if (duplicateEmail)
    return res.status(409).json({ message: 'Your email is associated with an existing account.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ first_name, last_name, email, permission, password: hashedPassword });

  if (user)
    return res.status(201).json(user);
  else
    return res.status(400).json({ message: 'Invalid user data received' });
}

module.exports = { login, register };
