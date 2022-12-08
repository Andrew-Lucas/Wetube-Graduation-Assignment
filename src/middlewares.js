export const localsMiddleware = (req, res, next)=>{
  res.locals = req.session
  console.log(res.locals)
  next()
}

export const protectedMiddleware = (req, res, next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    // Redirect to login 
    return res.redirect("/login")
  }
}

export const publicOnlyMiddleware = (req, res, next)=>{
  if(!req.session.loggedIn){
    next()
  } else{
    return res.redirect("/")
  }
}