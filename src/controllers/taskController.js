const TaskModel = require('../models/taskModel');
const bcrypt = require('bcrypt');
const asyncHandle = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

function generateRandomString(length) {
  return crypto.randomBytes(length / 2).toString('hex');
}
const addNewTask = asyncHandle(async (req, res) => {
  const {email, title, description, colorCard, dateStart, dateEnd, listTodo} =
    req.body;
  //  const existingUser = await UserModel.findOne({email});
  //  if (existingUser) {
  //    res.status(401);
  //    throw new Error(`Email has already exist !`);
  //  }
  const randomString = generateRandomString(24);

  const newTask = new TaskModel({
    title: title,
    description: description,
    colorCard: colorCard,
    dateStart: dateStart,
    dateEnd: dateEnd,
    listTodo: listTodo,
    email: email,
  });
  await newTask.save();

  res.status(200).json({
    message: 'add new task successfully',
    data: newTask,
  });
});
module.exports = {
  addNewTask,
};
