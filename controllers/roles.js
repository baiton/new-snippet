const ConnectRoles = require('connect-roles')
const { checkRole } = require('./authHelpers')

const user = new ConnectRoles({
  failureHandler(req, res, action){
    const accept = req.headers.accept || ''
    res
    .status(403)
    .send("Access Denied - You dont have permission to: " + action)
  }
})

user.use('access member resources', function(req, res){
  const person = req.user
  if (checkRole('member', user) || checkRole('admin', user)){
    return true
  }
})

user.use('access all the things', function(req, res){
  if (checkRole('admin', req.user)){
    return true
  }
})

module.exports = user
