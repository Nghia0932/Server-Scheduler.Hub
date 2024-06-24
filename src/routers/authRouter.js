const Router = require('express');
const {signup, signin} = require('../controllers/authController');
const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
module.exports = authRouter;
