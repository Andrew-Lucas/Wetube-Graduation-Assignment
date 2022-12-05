import "./db"
import "./models/Video"
import "./models/Users"
import app from "./server"

const PORT = 4000

const serverListen = () =>
  console.log(`✅Server listening from http://localhost:${PORT}`)

app.listen(PORT, serverListen)

