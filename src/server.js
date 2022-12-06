import express from 'express'
import sessions from "express-session"
import MongoStore from "connect-mongo"
import morgan from 'morgan'
import { localsMiddleware } from './middlewares'
import globalRouter from './routers/globalRouter'
import userRouter from './routers/userRouter'
import videosRouter from './routers/videoRouter'

const logger = morgan('dev')
const app = express()

app.use(logger)

app.set("views", process.cwd() + "/src/views")
app.set("view engine", "pug")
app.use(express.urlencoded({extended:true}))

app.use(sessions({
  secret: "Hello!",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/wetube"})
}))

app.use((req,res,next)=>{
  req.sessionStore.all((error,session)=>{
    next()
  })
})

app.use(localsMiddleware)

app.use('/', globalRouter)
app.use('/user', userRouter)
app.use('/videos', videosRouter)

export default app;