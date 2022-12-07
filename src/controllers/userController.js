import User from '../models/Users'
import bcrypt from "bcrypt"

export const getJoin = (req, res) => {
  res.render('Join', {pageTitle: "Create Account"})
}

export const postJoin = async (req, res) => {
  const {name, username, email, password, password2, location} = req.body
  const exists = await User.exists({$or:[{username},{email}]})
  if(password !== password2){
    return res.status(400).render('Join', {pageTitle: "Create Account", errors: "The passwords are not matched", name, username, email, password, password2, location})
  }
  if(exists){
    return res.status(400).render('Join', {pageTitle: "Create Account", errors: "The Username or Email already exists", name, username, email, password, password2, location})
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
    return res.render('join', {pageTitle: `"Create Account` ,errors: err._message})
  }
}



export const getLogin = (req, res) => {
  return res.render("login", {pageTitle: `Login` /* ,errors: err._message */})
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

export const logout = (req, res) => res.send('Logout of account')

export const editUser = (req, res) => res.send('Edit Your user profile')
export const deleteUser = (req, res) => res.send('Delete your user profile')
export const seeUser = (req, res) => res.send('See your account')
 

