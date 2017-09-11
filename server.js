const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express();
// const session = require('express-session')
const expressJWT= require('express-jwt')
const jwt = require('jsonwebtoken')
const Profile =require ('./models/users')
const roles = require ('./controllers/roles.js')
console.log('Profile', Profile);
const { createToken, ensureAuthenticated } = require('./controllers/authHelpers')
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

app.post('/login', roles.can('access member resources', (req, res) =>{
  User.findOne({username: req.body.username}, (err, existingUser) =>{
    if(existingUser){
      return res.status(409).send({message: "Username is already taken."})
    }
    const user = new User({
      name: req.body.username,
      password: req.body.password,
      roles: req.body.roles
    })
    user.save(() =>{
      res.send({token: createToken(user), message: "User has been created"})
    })
  })
}))

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

// PICK UP HERE WHEN YOU RETURN!!!!!!!
app.get('/logout', (req, res)=>{
  // ========================================
  // make a function that will log out the user????????????
  // ========================================

  res.redirect("/login")
})

//---------------main-----------------------
app.get('/snippets', ensureAuthenticated, (req, res) =>{

  //contains a navigation directory with indications on where to go
  res.render('./snippets')
})

app.get('/create', (req, res) =>{
  res.render('./create')
})

app.get('/profiles', ensureAuthenticated, (req, res) =>{
  res.render('./directory')
})

app.get('/css', ensureAuthenticated, (req, res) =>{
  res.render('./css')
})

app.get('/javascript', ensureAuthenticated, (req, res) =>{
  res.render('./javascript')
})

app.get('/html', ensureAuthenticated, (req, res) =>{
  res.render('./html')
})

app.get('/nodejs', ensureAuthenticated, (req, res) =>{
  res.render('./nodejs')
})



app.listen(3000, function() {
  console.log('server started on port: 3000')
})
