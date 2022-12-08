import User from '../models/Users'
import fetch from 'node-fetch'
import bcrypt from "bcrypt"
import { verify } from 'gulp-cli/lib/shared/cli-options'

export const getJoin = (req, res) => {
  res.render('Join', {pageTitle: "Create Account"})
}

export const postJoin = async (req, res) => {
  const {name, username, email, password, password2, location} = req.body
  const exists = await User.exists({username, email})
  console.log(exists)
  if(password !== password2){
    return res.status(400).render('Join', {pageTitle: "Create Account", errors: "The passwords are not matched", name, username, email, password, password2, location})
  }
  if(exists){
    return res.status(400).render('Join', {pageTitle: "Create Account", errors: "This is an account already exists", name, username, email, password, password2, location})
  }
  try{
    await User.create({
      name,
      username,
      email,
      password,
      location
    })
    res.redirect("/login") 
  } catch(err){
    console.log('There was an error')
    console.log(err/* ._message */)
    return res.status(400).render('Join', {pageTitle: "Create Account", errors: "There is already an account with the same email, Login with Password", name, username, email, password, password2, location})
  }
}



export const getLogin = (req, res) => {
  return res.render("login", {pageTitle: `Login`})
}

export const postLogin = async (req, res) => {
  try{
      const {username, email, password} = req.body
      const existingUser = await User.findOne({username, email})
      if (!existingUser){
        return res.status(400).render("login", {pageTitle: `Login`,errors: "This account does not exist!", username, email, password})
      }
      const correctPassword = await bcrypt.compare(password, existingUser.password)
      if(!correctPassword){
        return res.status(400).render("login", {pageTitle: `Login`,errors: "The password is incorrect", username, email, password})
      }
      req.session.loggedIn = true
      req.session.user = existingUser
      return res.redirect("/")
  } catch(err){
      console.log('There was an error')
      return res.render("login", {pageTitle: `Login`, errors: err._message}) 
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
    console.log(userReqJson)
    const emailReq = await fetch("https://api.github.com/user/emails", {
      headers:{
        Authorization: `token ${access_token}`
      }
    })
    const emailReqJson = await emailReq.json()
    const gitEmails = emailReqJson.find((email)=> email.verified === true && email.primary === true)
    if(!gitEmails){
      return res.redirect("/login")
    }
    console.log(userReqJson.location)
    console.log(gitEmails)

    const existingUser = await User.findOne({username:userReqJson.login, email: gitEmails.email})
    if(existingUser){
      req.session.loggedIn = true
      req.session.user = existingUser
      return res.redirect("/")
    } else{
      /* try{ */
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
      /* } catch(err){
        return res.render("/login", {pageTitle: `Login`, errors: "There is already an account with the same email, Login with Password"}) 
      } */
    }
  } 
  else{
    res.redirect("/login")
  }
}


export const logout = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

export const editUser = (req, res) => res.send('Edit Your user profile')
export const deleteUser = (req, res) => res.send('Delete your user profile')
export const seeUser = (req, res) => res.send('Seed your account')
 
