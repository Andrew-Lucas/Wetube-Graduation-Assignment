import multer from 'multer'

export const localsMiddleware = (req, res, next) => {
  res.locals = req.session
  res.locals.user = req.session.user || {}
    console.log(res.locals.user)
  next()
}

export const loggedInOnly = (req, res, next)=>{
  if(!req.session.loggedIn){
    console.log("For logged in users only")
    return res.redirect("/login")
  } else{
    next()
  }
}

export const guestsOnly = (req, res, next)=>{
  if(req.session.loggedIn){
    console.log("For guests only")
    return res.redirect("/")
  } else{
    next()
  }
}

export const avatarUpload = multer({ dest: 'avatars/', limits:{
  fileSize: 3000000,
} })

export const videoUpload = multer({ dest: 'AllVideos/' })
