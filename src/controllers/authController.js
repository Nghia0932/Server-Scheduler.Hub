const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const asyncHandle = require('express-async-handler');
const jwt = require('jsonwebtoken');

const getJsonwebtoken = async (email, id) => {
  const payload = {
    email,
    id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '7h',
  });

  return token;
};

const signup = asyncHandle(async (req, res) => {
  const {email, fullname, password} = req.body;

  const existingUser = await UserModel.findOne({email});
  if (existingUser) {
    res.status(401);
    throw new Error(`Email has already exist !`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    email,
    fullname: fullname,
    password: hashedPassword,
  });
  await newUser.save();

  res.status(200).json({
    message: 'signup new user successfully',
    data: {
      fullname: newUser.fullname,
      photoUrl: newUser.photoAvatardUrl,
      email: newUser.email,
      id: newUser.id,
      accesstoken: await getJsonwebtoken(email, newUser.id),
    },
  });
});

const signin = asyncHandle(async (req, res) => {
  const {email, password} = req.body;
  const existingUser = await UserModel.findOne({email});
  if (!existingUser) {
    res.status(403).json({
      message: 'Account does not exist!!',
    });
    throw new Error('Account not found !!');
  }
  const isMactchPassword = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isMactchPassword) {
    res.status(401);
    throw new Error('email or password is incorrect!');
  }
  res.status(200).json({
    message: 'ok',
    data: {
      fullname: existingUser.fullname,
      id: existingUser.id,
      email: existingUser.email,
      accesstoken: await getJsonwebtoken(email, existingUser.id),
    },
  });
});

module.exports = {
  signup,
  signin,
};
