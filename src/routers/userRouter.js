import express from 'express'
import {loggedInOnly, guestsOnly, avatarUpload} from "../middlewares"
import {startGithubLogin, finishedGithubLogin, viewProfile, getEditProfile, postEditProfile, getChangePassword, postChangePassword, logout} from "../controllers/userController"

const userRouter = express.Router()

userRouter.get("/github/start", guestsOnly, startGithubLogin)
userRouter.get("/github/finished", guestsOnly, finishedGithubLogin) 
userRouter.get('/:id([0-9a-z]{24})',loggedInOnly, viewProfile)
userRouter.route('/:id([0-9a-z]{24})/edit').all(loggedInOnly).get(getEditProfile).post(avatarUpload.single("avatar"), postEditProfile)
userRouter.route('/EditMyProfile/ChangePassword').all(loggedInOnly).get(getChangePassword).post(postChangePassword)
userRouter.get("/:id([0-9a-z]{24})/logout", loggedInOnly, logout)


export default userRouter

