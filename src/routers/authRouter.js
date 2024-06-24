const Router = require('express');
const {
  signup,
  signin,
  verification,
  resetPassword,
} = require('../controllers/authController');
const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/verification', verification);
authRouter.post('/resetPassword', resetPassword);

module.exports = authRouter;
