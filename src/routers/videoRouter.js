import express from "express"
import {upload ,editVideos, deleteVideos, seeVideos} from "../controllers/videoController"


const videosRouter = express.Router()

videosRouter.get('/upload', upload)
videosRouter.get('/:id', seeVideos)
videosRouter.get('/:id/edit', editVideos)
videosRouter.get('/:id/delete', deleteVideos)

export default videosRouter