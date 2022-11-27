import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

const dbOpen = ()=> console.log("Connected to DataBase ✅")
db.on("error", (error) => console.log("DB Error:", error))
db.once("open", dbOpen )


