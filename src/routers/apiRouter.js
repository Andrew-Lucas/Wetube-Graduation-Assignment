import express from 'express'
import {registerView, addComment, deleteComment} from "../controllers/videoController"

const apiRouter = express.Router()

apiRouter.post("/videos/:id([0-9a-z]{24})/view", registerView)
apiRouter.post("/videos/:id([0-9a-z]{24})/comment", addComment)
apiRouter.delete("/videos/:id([0-9a-z]{24})/comment/delete", deleteComment)

export default apiRouter;