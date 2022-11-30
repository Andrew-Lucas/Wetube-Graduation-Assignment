import express from 'express'
import morgan from 'morgan'
import globalRouter from './routers/globalRouter'
import userRouter from './routers/userRouter'
import videosRouter from './routers/videoRouter'

const logger = morgan('dev')
const app = express()

app.use(logger)

app.set("views", process.cwd() + "/src/views")
app.set("view engine", "pug")
app.use(express.urlencoded({extended:true}))
app.use('/', globalRouter)
app.use('/user', userRouter)
app.use('/videos', videosRouter)

export default app;