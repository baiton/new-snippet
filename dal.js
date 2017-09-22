const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');  //this lets me .then all my functions 
mongoose.connect('mongodb://localhost:27017/Snippets');  //I will make your DB!
//nick doesnt have the above here.  is it not needed in the dal?

const Profile = require('./models/users')
const Snippet = require('./models/snippet')
const jwt = require('jsonwebtoken')

//getAllUsers
//getProfileByUsername
//getSnippetByUsername
//getAllSnippets
//getOneSnippet
//searchSnippets
//getAuthorAndSnippets
//createSnippet


function getAllProfiles(){
  return Profile.find();
}

function getProfileByUsername(username){
  return Profile.findOne({username: username})
}

function getAllSnippets(){
  return Snippet.find();
}

function getSnippetByUsername(username){
  return Snippet.findOne({profile: username})
}

function getOneSnippet(id){
  return Snippet.findOne({_id: id}).populate('author')
}

function getProfileAndSnippets(username){
  return Profile.findOne({username: username}).populate('snippets')
}

function createProfile(info){
    const newProfile = new Profile(info)
    newProfile.save(function(err){
      console.log('err from newProfile', err);
    })
    return Promise.resolve('success');  //what is this Promise?  where does it come from?
}

function createSnippet(newSnippet, token){
  let decoded = jwt.decode(token);
  let splitTags = newSnippet.tags.split(' ');
  let fullSnippet = {
    title: newSnippet.title,
    description: newSnippet.description,
    content: newSnippet.content,
    created: new Date(),
    language: newSnippet.language,
    profile: decoded.sub,  //ask about this .sub situation
    tags: splitTags
  };
  const snippet = new Snippet(fullSnippet)
  snippet.save(function(err){
    console.log("err from createSnippet", err);
  })
  getProfileByUsername(decoded.user).then((author) =>{
    profile.snippets.push(snippet._id);
    author.save(function(err){
      console.log("err from adding snippet to User", err);
    })
  })
}


module.exports = {
  getAllProfiles,
  getProfileByUsername,
  getAllSnippets,
  getSnippetByUsername,
  getOneSnippet,
  getProfileAndSnippets,
  createProfile,
  createSnippet
}
