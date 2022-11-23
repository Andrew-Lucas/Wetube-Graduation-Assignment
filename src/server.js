import express from 'express'
import morgan from 'morgan'
import globalRouter from './routers/globalRouter'
import userRouter from './routers/userRouter'
import videosRouter from './routers/videoRouter'

const logger = morgan('dev')
const app = express()

const PORT = 4000
app.use(logger)

app.set("views", process.cwd() + "/src/views")
app.set("view engine", "pug")
app.use('/', globalRouter)
app.use('/user', userRouter)
app.use('/videos', videosRouter)

const serverListen = () =>
  console.log(`✅Server listening from http://localhost:${PORT}`)
app.listen(PORT, serverListen) 

