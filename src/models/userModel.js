const {default: mongoose} = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  photoAvatarUrl: {
    type: String,
  },

  photoBackGroundUrl: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
