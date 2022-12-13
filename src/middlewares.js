import multer from 'multer'

export const localsMiddleware = (req, res, next) => {
  res.locals = req.session
  res.locals.user = req.session.user || {}
  /*   console.log(res.locals) */
  next()
}

export const protectedMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else {
    // Redirect to login
    return res.redirect('/login')
  }
}

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next()
  } else {
    return res.redirect('/')
  }
}

export const avatarUpload = multer({ dest: 'avatars/', limits:{
  fileSize: 3000000,
} })

export const videoUpload = multer({ dest: 'videos/' })
