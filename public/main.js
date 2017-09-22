// // make event listener for post of login
//
// console.log("working");
// const baseUrl = 'http://localhost:8000/api';
//
// (function() {
//   const loginForm = document.querySelector('#loginFrom')
//
//   loginForm.addEventListener('submit', function(event) {
//     event.preventDefault()
//     const usernameInput = event.target.querySelector('input[name="username"]')
//     const passwordInput = event.target.querySelector('input[name="password"]')
//     const creds = {
//       username: usernameInput.value,
//       password: passwordInput.value
//     }
//
//     login(creds).then(function(res) {
//       console.log("its logging in!!!", res)
//       setToken(res.token)
//       usernameInput.value = ""
//       passwordInput.value = ""
//       event.target.classlist = ""
//     })
//   })
//
//   const getUsrBtn = document.querySelector('button[name=showUsers]')
//   getUsrBtn.addEventListener('click', function(event) {
//     event.preventDefault()
//     const usersDom = document.querySelector('#users')
//     getUsers().then(function(usrs) {
//       usersDom.innerHTML = createManyUsersHTML(users)
//     })
//   })
// })()
//
// //auth Methods
//
// function login(creds){
//   return fetch('${baseUrl}/auth/login', {
//     headers: {Accept: 'application/json', 'Content-Type', 'application/json'},
//     method: 'POST',
//     body: JSON.stringify(creds)
//   })
//   .then(response => response.json())
//   .catch(err => console.log(err))
// }
//
// function logout(){
//   removeToken()
//   window.location.path = '/'
// }
//
// function createUserHTML(userObj){
//   return `
//     <div>
//       <h3>${userObj.name}</h3>
//   `
// }
//
// function createManyUsersHTML (usersArr){
//   let html = ''
//   usersArr.forEach(function(usr){
//     html+=createUserHTML
//   })
//   return html
// }
//
// // user Methods
//
// function getUsers(){
//   return fetch('${baseUrl}/users', {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ${getToken()}'
//     }
//   })
//   .then(res => res.json())
//   .catch(err => console.log(err))
// }
//
// fuction getUser(userId){
//   return fetch('${baseUrl}/users/${userId}', {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ${getToken()}'
//     }
//   })
//   .then(res => res.json())
//   .catch(err => console.log(err))
// }
//
// function updateUser (userId){
//   return fetch('$baseUrl/users/${updatedUser._id}', {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ${getToken()}'
//     },
//     method: 'PUT',
//     body: JSON.stringify(updatedUser)
//   })
//   .then(res => res.json())
//   .catch(err => console.log(err))
// }
//
// function removeUser(userId){
//   return fetch('${baseUrl}/users/${userId}', {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ${getToken()}'
//     }
//     method: 'DELETE'
//   })
//   .then(res => res.json())
//   .catch(err => console.log(err))
// }
//
// //token Methods
// function getToken(){
//   const token = window.localStorage.getItem('token')
//   if(token){
//     return token
//   } else {
//     console.log('something went wrong');
//   }
// }
//
// function setToken(){
//   window.localStorage.setItem('token', token)
//   return token
// }
// function removeToken(){
//   window.localStorage.removeItem('token')
// }
