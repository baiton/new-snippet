const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  username: {type: String, require: true},
  Password: {type: String, require: true}
})

const profile = mongoose.model('profile', ProfileSchema) //I will make your collection but plural!

module.exports= profile;
