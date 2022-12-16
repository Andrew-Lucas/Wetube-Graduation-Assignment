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
    req.flash("error", "Not authorized")
    return res.redirect('/login')
  }
}

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next()
  } else {
    req.flash("error", "Users are not allowed to login twice")
    return res.redirect('/')
  }
}

export const avatarUpload = multer({ dest: 'avatars/', limits:{
  fileSize: 3000000,
} })

export const videoUpload = multer({ dest: 'videos/' })
