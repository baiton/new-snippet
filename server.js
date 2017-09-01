const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express();
// const session = require('express-session')
const expressJWT= require('express-jwt')
const jwt = require('jsonwebtoken')
const {
  profile
} =require ('./models/users')

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('public'));
app.use(expressJWT({secret: 'cows have spots'}).unless({path: ['/login']}));

// app.use(session({
//   secret: 'cows have spots',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

// ---------------homepage----------------
app.get('/', (req, res) =>{
  res.render('./home')
})

// --------------Login---------------------
app.get('/login', (req, res) =>{
  res.render('./login')
})

app.post('/loggedIn', (req, res) =>{
  if(!req.body.username){
    res.status(400).send('username required');
    return;
  }
  if(!req.body.password){
    res.status(400).send('password required');
    return;
  }
  profile.findOne({username: req.body.username}, (err, profile) =>{
    profile.comparePassword(req.body.password, (err, isMatch) =>{
      if (err) throw err;
      if (!isMatch){
        res.status(401).send('Invalid Password');
      } else {
        res.status(200).json({});
      }
    })
  })
  // res.redirect('/')
})

// --------------Register------------------
app.get('/register', (req, res) =>{
  res.render('./register')
})

app.post('/registered', (req, res) =>{
  res.redirect('/')
})

app.listen(3000, function() {
  console.log('server started on port: 3000')
})
