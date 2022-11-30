import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/wetube', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection 

const dbError = (error)=> console.log("😞DB Error:", error)
const operDb = ()=> console.log("Connected to DataBase📀")

db.on("error", dbError)
db.once("open", operDb)


