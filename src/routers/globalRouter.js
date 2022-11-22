import express from 'express'
import {handleLogin , join } from '../controllers/userController'
import {handleHome} from "../controllers/videoController"

const globalRouter = express.Router()

globalRouter.get('/', handleHome)
globalRouter.get('/join', join)
globalRouter.get('/login', handleLogin)

export default globalRouter