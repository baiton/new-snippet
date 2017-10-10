const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express();
// const session = require('express-session')
const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')
const Profile = require('./models/users')
const roles = require('./controllers/roles.js')
// console.log('Profile', Profile);
const {createToken, ensureAuthenticated} = require('./controllers/authHelpers')
const {
  getAllProfiles,
  getProfileByUsername,
  getAllSnippets,
  getSnippetByUsername,
  getOneSnippet,
  getProfileAndSnippets,
  createProfile,
  createSnippet
} = require('./dal.js')

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));

// app.use(expressJWT({secret: 'cows have spots'}).unless({path: ['/login']}));

// ---------------homepage----------------
app.get('/', (req, res) => {
  //if not logged in show welcome/about info
  res.render('./home')
})

// --------------Login---------------------
app.get('/login', (req, res) => {
  res.render('./login')
})

// I need help with the comparing login credentials to my db

// router.route('/').post((req, res) => {
//   User.findOne({ email: req.body.email }, '+password', function (
//     err,
//     user,
//     next
//   ) {
//     if (err) return next(err)
//     if (!user) {
//       return res.status(401).send({ message: 'Wrong email and/or password' })
//     }
//     user.comparePassword(req.body.password, user.password, function (
//       err,
//       isMatch
//     ) {
//       console.log('is match', isMatch)
//       if (!isMatch) {
//         return res.status(401).send({ message: 'Wrong email and/or password' })
//       }
//       res.send({ token: createToken(user), roles: user.roles })
//     })
//   })
// })

app.post('/login', (req, res) => {
  Profile.findOne({
    username: req.body.username
  }, '+password', (err, user, next) => {
    if (!user) {
      return res.status(401).send({message: 'Wrong email and/or password'})
    }
    user.comparePassword(req.body.password, user.password, (err, isMatch) => {
      console.log('is Match', isMatch)
      if (!isMatch) {
        return res.status(401).send({message: "Wrong email and/or password"})
      }
      res.send({token: createToken(user)})
    })
  })
})
// --------------Register------------------
app.get('/register', (req, res) => {
  //requires login creditials.
  res.render('./register')
})

app.post('/registered', (req, res) => {
  //create account for user the redirect to profile page
  createProfile(req.body).then((account) => {
    res.redirect('/snippets')
  })
})

// PICK UP HERE WHEN YOU RETURN!!!!!!!
app.get('/logout', (req, res) => {
  // ========================================
  // make a function that will log out the user????????????
  // ========================================

  res.redirect("/login")
})

//---------------main-----------------------
app.get('/snippets', (req, res) => {
  //function goes here
  //contains a navigation directory with indications on where to go
  res.render('./snippets')
})

app.get('/create', (req, res) => {
  res.render('./create')
})

app.post('/create', (req, res) => {
  createSnippet(req.body)
  res.redirect('./snippets')
})

app.get('/profiles', (req, res) => {
  res.render('./directory')
})

app.get('/css', (req, res) => {
  res.render('./css')
})

app.get('/javascript', (req, res) => {
  res.render('./javascript')
})

app.get('/html', (req, res) => {
  res.render('./html')
})

app.get('/nodejs', (req, res) => {
  res.render('./nodejs')
})

app.listen(3000, function() {
  console.log('server started on port: 3000')
})
