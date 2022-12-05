import User from '../models/Users'

export const getJoin = (req, res) => {
  res.render('Join', {pageTitle: "Create Account"})
}

export const postJoin = async (req, res) => {
  const {name, username, email, password, password2, location} = req.body
  const exists = await User.exists({$or:[{username},{email}]})
  if(password !== password2){
    return res.render('Join', {pageTitle: "Create Account", errors: "The passwords are not matched"})
  }
  if(exists){
    return res.render('Join', {pageTitle: "Create Account", errors: "The Username or Email already exists"})
  }
  await User.create({
    name,
    username,
    email,
    password,
    location
  })
  res.redirect("/login") 
}



export const handleLogin = (req, res) => res.send('Login')

export const logout = (req, res) => res.send('Logout of account')

export const editUser = (req, res) => res.send('Edit Your user profile')
export const deleteUser = (req, res) => res.send('Delete your user profile')
export const seeUser = (req, res) => res.send('See your account')
