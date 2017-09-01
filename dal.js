const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/Cartoons');  //I will make your DB!
const UserModel = require('./models/users')

function getAllUsers(){
  return UserModel.find();
}
// console.log('getAllUsers', UserModel.find());
