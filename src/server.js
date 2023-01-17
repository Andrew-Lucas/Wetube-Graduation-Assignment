import dotenv from "dotenv/config"
import "./db"
import "./models/Video"
import "./models/Users"
import "./models/Comments"

import express from 'express'
import sessions from 'express-session'
import MongoStore from 'connect-mongo'
import flash from 'express-flash'
import morgan from 'morgan'
import { localsMiddleware } from './middlewares'
import globalRouter from './routers/globalRouter'
import userRouter from './routers/userRouter'
import videosRouter from './routers/videoRouter'
import apiRouter from './routers/apiRouter'

const logger = morgan('dev')
const app = express()
const PORT = process.env.PORT || 7000

app.use(logger)

app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
  sessions({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
)

app.use((req, res, next) => {
  req.sessionStore.all((error, session) => {
    next()
  })
})

app.use(flash())
app.use(localsMiddleware)

app.use('/avatars', express.static('avatars'))
app.use('/AllVideos', express.static('AllVideos'))
app.use('/assets', express.static('assets'))
app.use('/', globalRouter)
app.use('/user', userRouter)
app.use('/videos', videosRouter)
app.use('/api', apiRouter)
  
app.listen(PORT, ()=> console.log(`✅Server listening from http://localhost:${PORT}`))