import express from 'express'
import {protectedMiddleware, publicOnlyMiddleware} from "../middlewares"
import { deleteUser, getEditProfile, postEditProfile, getChangePassword, postChangePassword, logout, seeUser, startGithubLogin, finishedGithubLogin } from '../controllers/userController'
const userRouter = express.Router()

userRouter.get("/logout", protectedMiddleware, logout)
userRouter.route('/EditMyProfile').all(protectedMiddleware).get(getEditProfile).post(postEditProfile)
userRouter.route('/EditMyProfile/ChangePassword').all(protectedMiddleware).get(getChangePassword).post(postChangePassword)
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin)
userRouter.get("/github/finished", publicOnlyMiddleware, finishedGithubLogin) 
userRouter.get('/delete', deleteUser)
userRouter.get('/:id', seeUser)

export default userRouter

