import express from "express"
import morgan from "morgan"

const logger = morgan("dev")
const app = express()

const PORT = 4000

const serverRespond = (req, res)=> {
  return res.send("<h1>Response from the server</h1>")
}
app.get("/", serverRespond)


/* const testMiddleWare1 = (req, res, next)=>{
  console.log("First middle ware")
  return next()
}
const testMiddleWare2 = (req, res, next)=>{
  const url = req.url
  if(url === "/testserver/a"){
    console.log("❌Page not allowed")
    return res.send("Bro your lost")
  } else{
    console.log(req.path)
    return next()
  }
} */

const testServerResponse = (req, res)=>{
  console.log("Server Response Returned")
  return res.send("<h2>Test Server Response</h2>")
}
app.use(logger)
app.get("/testserver", testServerResponse)


const serverListen = ()=> console.log(`✅Server listening from http://localhost:${PORT}`)
app.listen(PORT, serverListen) 
