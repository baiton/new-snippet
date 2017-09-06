const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/Snippets');  //I will make your DB!
const ProfileModel = require('./models/users')

function getAllUsers(){
  console.log(ProfileModel.find());
  return ProfileModel.find();
}

function newAccount(info){
    let newGuy = new ProfileModel(info)
    newGuy.save(function(err){
      console.log('err from newGuy', err);
    })
    return Promise.resolve('success');
}



// console.log('getAllUsers', UserModel.find());
module.exports = {
  getAllUsers: getAllUsers,
  newAccount: newAccount
}
