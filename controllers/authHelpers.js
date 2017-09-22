// get login page
// b: request login page GET
// S: responds with Mustache login template RENDER send

// user fills out login form
// B: submit login form to '/login' POST
// S: checks creds, comparing to db password, then if legit
// S: sends token back to browser (based on user on db) (createToken)
// B: receive token from server after successful login (need to save token)
// B: use localStorage.setItem('token', tokenstring) from response of server


// after time you want to see page with ensure auth
// B: GET request '/users' <-- only logged in users
// B: use fetch to get users, but needs to add auth token that was saved in localStorage
// B: in fetch request add 'Authorization: Bearer <TOKEN>' in header
// S: grabs token checks validity from Auth Header
// if token valid and not expoired move on to complete route methods... all good

const jwt = require('jsonwebtoken')
const moment = require ('moment')

module.exports = {
  createToken,
  ensureAuthenticated
}

//ask whats happening here
function createToken(user){
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix(),
    user: user.username
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET)
}

// function checkRole(role, user){
//   console.log("user", user);
//   return user.roles.indexOf(role) > -1
// }

function ensureAuthenticated( req, res, next){
  if (!req.headers.authorization){
    return res
    .status(401)
    .json({
      message: 'Please make sure your request has an Authorization header'})
  } //Bearer <header.payload.verifySig>  ***Note the space between Bearer and my TOKEN for split(" ")
  const token= req.headers.authorization.split(' ')[1]
  try{
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) =>{
      if (err){
        res
          .status(401)
          .json({message: "Your token has expired.", error: err})
    }
  req.user = payload.sub
  next()
})
}
catch(error){
  console.log(error)
  next(error)
}
}


// const {exp, username, roles, _id} = jwt.verify(token, TOKEN_SECRET)
// console.log('PAYLOAD', exp, username, roles);
// if (exp <= moment().unix()){
//   return res.status(401).send({message: 'Token has expired'})
// }
// req.user = payload.sub
// next()
// }
