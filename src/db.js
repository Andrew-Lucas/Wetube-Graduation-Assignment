import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection 

const dbError = (error)=> console.log("😞DB Error:", error)
const operDb = ()=> console.log("Connected to DataBase📀")

db.on("error", dbError)
db.once("open", operDb)
