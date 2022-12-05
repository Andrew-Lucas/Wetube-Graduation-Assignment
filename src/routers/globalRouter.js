import express from 'express'
import {handleLogin , getJoin, postJoin } from '../controllers/userController'
import {handleHome, searchVideo} from "../controllers/videoController"

const globalRouter = express.Router()

globalRouter.get('/', handleHome)
globalRouter.route('/join').get(getJoin).post(postJoin)
globalRouter.get('/login', handleLogin)
globalRouter.get("/search", searchVideo)

export default globalRouter 