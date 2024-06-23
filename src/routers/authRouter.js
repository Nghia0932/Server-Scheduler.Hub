const Router = require('express');
const {signup} = require('../controllers/authController');
const authRouter = Router();

authRouter.post('/signup', signup);
module.exports = authRouter;
