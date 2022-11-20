import express from "express"

const app = express()

const PORT = 4000

const serverRespond = (req, res)=> {
  console.log(res)
  return res.send("<h1>Response from the server</h1>")
}
app.get("/", serverRespond)


const testMiddleWare1 = (req, res, next)=>{
  console.log("First middle ware")
  return next()
}
const testMiddleWare2 = (req, res, next)=>{
  console.log("Second middle ware")
  return next()
}
const testServerResponse = (req, res)=>{
  console.log("Server Response Returned")
  return res.send("<h2>Test Server Response</h2>")
}
app.get("/testserver", testMiddleWare1, testMiddleWare2 ,testServerResponse)


const serverListen = ()=> console.log(`Server listening from http://localhost:${PORT}`)
app.listen(PORT, serverListen) 
