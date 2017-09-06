const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const ProfileSchema = new mongoose.Schema({
  username: {type: String, unique: true, lowercase: true},
  password: {type: String, select: false},
  roles: {type: Array}
})

ProfileSchema.pre('save', function(next){
  const profile = this
  if(!profile.isModified('password')){
    next()
  }
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(profile.password, salt, (err, hash) =>{
      profile.password = hash
       next()
    })
  })
})

ProfileSchema.method.comparePassword = (password, dbPass, done)=>{
  bcrypt.compare(password, dbPass, (err, isMatch) => {
    done(err, isMatch)
  })
}





// Everything here should go to the bottom
const Profile = mongoose.model('Profile', ProfileSchema) //I will make your collection but plural!


module.exports= {
  Profile: Profile
}
