const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express();
// const session = require('express-session')
const expressJWT= require('express-jwt')
const jwt = require('jsonwebtoken')
const {Profile} =require ('./models/users')
console.log('Profile', Profile);
const { createToken } = require('./controllers/authHelpers')
const {
  getAllUsers: getAllUsers,
  newAccount: newAccount
} = require('./dal.js')

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('public'));

// app.use(expressJWT({secret: 'cows have spots'}).unless({path: ['/login']}));


// ---------------homepage----------------
app.get('/', (req, res) =>{
  //if not logged in show welcome/about info
  res.render('./home')
})

// --------------Login---------------------
app.get('/login', (req, res) =>{
  res.render('./login')
})

app.post('/login', (req, res) =>{
  Profile.findOne({username: req.body.username}, '+password', function(
    err,
    user,
    next
  ){
    if (err) return next(err)
    if (!user){
      return res.status(401).send({message: 'Wrong username and/or password'})
    }
    user.comparePassword(req.body.password, user.password, function(
      err,
      isMatch
    ){
      console.log('is match', isMatch);
      if (!isMatch){
        return res.status(401).send({message: 'Wrong username and/or password'})
      }
      res.redirect('/snippets')
    })
  })
})

// --------------Register------------------
app.get('/register', (req, res) =>{
  //requires login creditials.
  res.render('./register')
})

app.post('/registered', (req, res) =>{
  //create account for user the redirect to profile page
  newAccount(req.body).then((account) =>{
    res.redirect('/snippets')
  })
})

//---------------main-----------------------
app.get('/snippets', (req, res) =>{

  //contains a navigation directory with indications on where to go
  res.render('./snippets')
})

app.get('/profiles', (req, res) =>{
  res.render('./directory')
})

app.get('/css', (req, res) =>{
  res.render('./css')
})

app.get('/javascript', (req, res) =>{
  res.render('./javascript')
})

app.get('/html', (req, res) =>{
  res.render('./html')
})

app.get('/nodejs', (req, res) =>{
  res.render('./nodejs')
})



app.listen(3000, function() {
  console.log('server started on port: 3000')
})
