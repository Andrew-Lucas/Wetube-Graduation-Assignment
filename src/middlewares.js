export const localsMiddleware = (req, res, next)=>{
  res.locals = req.session
  console.log(res.locals)
  next()
}