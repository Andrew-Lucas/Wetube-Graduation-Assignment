import express from "express"
import {upload ,editVideos, deleteVideos, seeVideos} from "../controllers/videoController"


const videosRouter = express.Router()

 videosRouter.get('/upload', upload)
videosRouter.get('/:id(\\d+)', seeVideos)
videosRouter.get('/:id(\\d+)/edit', editVideos)
videosRouter.get('/:id(\\d+)/delete', deleteVideos)

export default videosRouter
