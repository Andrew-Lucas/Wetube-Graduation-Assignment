import User from '../models/Users'
import Video from '../models/Video'
import fetch from 'node-fetch'
import bcrypt from "bcrypt"
import { verify } from 'gulp-cli/lib/shared/cli-options'

export const getJoin = (req, res) => {
  res.render('users/join', {pageTitle: "Create Account"})
}

export const postJoin = async (req, res) => {
  const { newName, newUsername, newEmail, newPassword, confirmNewPassword, newLocation} = req.body

  try {
    const accounts = await User.find({})
    const existingAccount = accounts.find(
      (account) =>
        account.username === newUsername && account.email === newEmail
    )
    if (existingAccount) {
      return res.status(400).render('users/join', {
        errors: 'This account exists, loggin instead', newName, newUsername, newEmail, newPassword, confirmNewPassword, newLocation,
      })
    }

    const usernameExists = await User.findOne({ username: newUsername })
    if (usernameExists) {
      return res.status(400).render('users/join', {
        errors: 'This username is not available, try using another username', newName, newUsername, newEmail, newPassword, confirmNewPassword, newLocation,
      })
    }

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .render('users/join', { errors: 'Your passwords are unmatched', newName, newUsername, newEmail, newPassword, confirmNewPassword, newLocation, })
    }
    const createdUser = await User.create({
      name: newName,
      username: newUsername,
      email: newEmail,
      password: newPassword,
      location: newLocation,
    })
    return res.redirect('/login')
  } catch (err) {
    console.log(err)
    return res
      .status(400)
      .render('users/join', { errors: 'An error occured with the server' })
  }
}


export const getLogin = (req, res) => {
  return res.render("users/login", {pageTitle: `Login`})
}


export const postLogin = async (req, res) => {
  const {username, email, password} = req.body
  try{
    const userExists = await User.findOne({ username })
    if (!userExists) {
      return res.status(400).render('users/login', {
        errors: 'There is no account with this username',
        username,
        email,
        password,
      })
    }
    if (userExists.email !== email) {
      return res.status(400).render('users/login', {
        errors:
          'This account does not exist, Create an account first then login',
        username,
        email,
        password,
      })
    }
    const correctPassword = await bcrypt.compare(password, userExists.password)
    if (!correctPassword) {
      return res.status(400).render('users/login', {
        pageTitle: `Login`,
        errors: 'The password is incorrect',
        username,
        email,
        password,
      })
    }
      req.session.loggedIn = true
      req.session.user = userExists
      return res.redirect("/")
  } catch(err){
      console.log('There was an error', err)
      return res.render("users/login", {pageTitle: `Login`, errors: "An error occured with the server"}) 
  } 
}


export const startGithubLogin = (req, res)=>{
  const baseUrl = "https://github.com/login/oauth/authorize?"
  const configuration = {
    client_id:process.env.CLIENT_ID,
    scope:"user:email user:location read:user"
  }
  const params = new URLSearchParams(configuration).toString()
  const finalUrl = `${baseUrl}${params}`
  return res.redirect(finalUrl)
}


export const finishedGithubLogin = async (req, res)=>{
  const baseUrl = "https://github.com/login/oauth/access_token"
  const configuration = {
    client_id:process.env.CLIENT_ID,
    client_secret:process.env.CLIENT_SECRET,
    code:req.query.code
  }
  const params = new URLSearchParams(configuration).toString()
  const finalUrl = `${baseUrl}?${params}`
  const data = await fetch(finalUrl, {
    method: "POST",
    headers:{
    Accept: "application/json"
    }
  })
  const json = await data.json()
  if("access_token" in json){
    const {access_token} = json
    const authUrl = `https://api.github.com/user`
    const userReq = await fetch(authUrl, {
      headers:{
        Authorization: `token ${access_token}`
      }
    })
    const userReqJson = await userReq.json()
    const emailReq = await fetch("https://api.github.com/user/emails", {
      headers:{
        Authorization: `token ${access_token}`
      }
    })
    const emailReqJson = await emailReq.json()
    console.log(userReqJson)
    console.log(emailReqJson)
    const gitEmails = emailReqJson.find((email)=> email.verified === true && email.primary === true)
    if(!gitEmails){
      return res.redirect("/login")
    }

    const existingUser = await User.findOne({email: gitEmails.email})
    if(existingUser){
      req.session.loggedIn = true
      req.session.user = existingUser
      return res.redirect("/")
    } else{
        await User.create({
          name: userReqJson.name,
          avatarURL: userReqJson.avatar_url,
          username: userReqJson.login,
          email: gitEmails.email,
          password: "",
          githubLogin: true,
          githubID: userReqJson.id,
          location: userReqJson.location
        })
        req.session.loggedIn = true
        const gitUser = await User.findOne({username: userReqJson.login})
        req.session.user = gitUser
        return res.redirect("/") 
    }
  } 
  else{
    res.redirect("login")
  }
}


export const viewProfile = async (req, res) => {
  const {id} = req.params
  const selectedUser = await User.findById(id).populate("userVideos")
  if(!selectedUser){
    return res.status(404).render("404", {pageTitle: "User not found"})
  }
  return res.render('users/viewProfile', {pageTitle: `${selectedUser.name}`, selectedUser})
}


export const getEditProfile = (req, res)=>{
  return res.render("users/EditProfile", {pageTitle: "Edit Profile"})
}


export const postEditProfile = async (req, res)=>{
  const {session:{
    user:{_id, avatarURL}
  }, body:{editName, editUsername, editLocation,}, file} = req
    try{
      const existingUsername = await User.find()
      const updatedUser = await User.findByIdAndUpdate(_id, {
        name: editName,
        avatarURL: file ? file.path : avatarURL,
        username: editUsername,
        location: editLocation
      }, {new:true})
      req.session.user = updatedUser
       return res.redirect("/")
    } catch(err){
      console.log('there was an error in the server', err)
      return res.status(400).render('users/EditProfile', {pageTitle: "Edit Profile", errors: "An error occured in the server"})
    }
}

export const getChangePassword = (req, res)=>{
  const {user: {githubLogin}} = req.session
  console.log(githubLogin)
  if(githubLogin){
    return res.status(400).redirect("/user/EditMyProfile")
  }
  return res.render("users/ChangePassword", {pageTitle: "Edit Password"})
}

export const postChangePassword = async (req, res)=>{
  const {session:{
    user:{_id, password}
  }, body:{OldPassword, NewPassword, ConfirmNew}} = req
  try{
    const savedUser= await User.findById(_id)
    const correctPassword = await bcrypt.compare(OldPassword, savedUser.password)
    if(!correctPassword){
      req.flash("error", "Incorrect Password")
      return res.render("users/ChangePassword", {pageTitle: "Edit Password", errors: "The password you entered does not match the previously saved password", OldPassword, NewPassword, ConfirmNew})
    }
    if(NewPassword !== ConfirmNew){
      req.flash("error", "Incorrect Password")
      return res.render("users/ChangePassword", {pageTitle: "Edit Password", errors: "The new password that you entered does not match the password you confirmed", OldPassword, NewPassword, ConfirmNew})
    }
    savedUser.password = NewPassword
    await savedUser.save()
    req.session.user.password = savedUser.password
    req.flash("info", "Password updated")
    return res.redirect("/")
  } catch{
    console.log("Password Catch error")
    req.flash("error", "Server Error")
    return res.status(400).render("users/ChangePassword", {pageTitle: "Edit Password"})
  }
}

export const logout = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}
 