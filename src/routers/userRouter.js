import express from 'express'
import { deleteUser, editUser, logout, seeUser, startGithubLogin, finishedGithubLogin } from '../controllers/userController'
const userRouter = express.Router()

userRouter.get('/:id', seeUser)
userRouter.get('/edit', editUser)
userRouter.get("/github/start", startGithubLogin)
userRouter.get("/github/finished", finishedGithubLogin)
userRouter.get("/logout", logout)
userRouter.get('/delete', deleteUser)

export default userRouter

