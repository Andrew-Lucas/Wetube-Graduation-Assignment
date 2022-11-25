import express from "express"
import {upload ,getEditVideos, deleteVideos, seeVideos, postEditVideos} from "../controllers/videoController"


const videosRouter = express.Router()

videosRouter.get('/upload', upload)
videosRouter.get('/:id(\\d+)', seeVideos)
videosRouter.route("/:id(\\d+)/edit").get(getEditVideos).post(postEditVideos)
videosRouter.get('/:id(\\d+)/delete', deleteVideos)

export default videosRouter
