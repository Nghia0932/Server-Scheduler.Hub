const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const asyncHandle = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  //secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USERNAME_EMAIL,
    pass: process.env.PASSWORD,
  },
  //tls: {
  //  rejectUnauthorized: false,
  //},
});

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

const handleSendMail = async (val) => {
  try {
    await transporter.sendMail(val);
    return 'OKAY';
  } catch (error) {
    return error;
  }
};
const verification = asyncHandle(async (req, res) => {
  const {email} = req.body;
  const verificationCode = Math.round(1000 + Math.random() * 9000);
  try {
    const data = {
      from: `'Support Scheduler.Hub' <${process.env.USERNAME_EMAIL}>`,
      to: email,
      subject: 'Vertification email code',
      text: 'Your code to verification email',
      html: `<h1>${verificationCode}</h1>`, // html body
    };
    await handleSendMail(data);
    res.status(200).json({
      messgae: 'Send code successfully',
      data: {
        code: verificationCode,
      },
    });
  } catch (error) {
    res.status(401);
    throw new Error('Error send code xxx');
  }
});

const resetPassword = asyncHandle(async (req, res) => {
  const {email, password} = req.body;
  const user = await UserModel.findOne({email});
  if (user) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(`${password}`, salt);

    await UserModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      isChangePassword: true,
    });
    await handleSendMail(data)
      .then(() => {
        res.status(200).json({
          message: 'reset password was successfully !',
          data: [],
        });
      })
      .catch((error) => {
        res.status(401);
        throw new Error(`Can not reset password`, {error});
      })
      .then(() => {
        console.log('Done');
      })
      .catch((error) => console.log(error));
  } else {
    res.status(401);
    throw new Error(`User not found`);
  }
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
  verification,
  resetPassword,
};
