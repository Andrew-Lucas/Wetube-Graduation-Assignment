import express from "express"

const app = express()

const PORT = 4000

const serverRespond = ()=> console.log("Someone is tryng to acces the server")
app.get("/", serverRespond)

const serverListen = ()=> console.log(`Server listening from http://localhost:${PORT}`)

app.listen(4000, serverListen)