import express from 'express'
import {protectedMiddleware, publicOnlyMiddleware} from "../middlewares"
import { deleteUser, editUser, logout, seeUser, startGithubLogin, finishedGithubLogin } from '../controllers/userController'
const userRouter = express.Router()

userRouter.get("/logout", protectedMiddleware, logout)
userRouter.get('/edit', protectedMiddleware, editUser)
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin)
userRouter.get("/github/finished", publicOnlyMiddleware, finishedGithubLogin)
userRouter.get('/delete', deleteUser)
userRouter.get('/:id', seeUser)

export default userRouter

