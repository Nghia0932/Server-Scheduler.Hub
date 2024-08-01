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
  const {
    email,
    title,
    description,
    colorCard,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    listTodo,
  } = req.body;
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
    timeStart: timeStart,
    timeEnd: timeEnd,
    listTodo: listTodo,
    email: email,
  });
  await newTask.save();

  res.status(200).json({
    message: 'add new task successfully',
  });
});

const getAllTask = asyncHandle(async (req, res) => {
  const {email} = req.body;

  try {
    const allTasks = await TaskModel.find({email}).exec();

    if (allTasks.length === 0) {
      res.status(200).json({
        message: 'User has not created any tasks',
      });
    } else {
      res.status(200).json({
        message: 'Get All Tasks',
        data: {
          message: 'Success',
          data: allTasks,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

module.exports = {
  addNewTask,
  getAllTask,
};
