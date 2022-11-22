import express from 'express'
import { deleteUser, editUser, logout, seeUser } from '../controllers/userController'
const userRouter = express.Router()

userRouter.get('/:id', seeUser)
userRouter.get('/edit', editUser)
userRouter.get("/logout", logout)
userRouter.get('/delete', deleteUser)

export default userRouter



                                                                                                                                                                                                                                                         