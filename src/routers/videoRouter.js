import express from "express"
import {getUpload, postUpload ,getEditVideos, deleteVideos, seeVideos, postEditVideos} from "../controllers/videoController"


const videosRouter = express.Router()


videosRouter.route('/upload').get(getUpload).post(postUpload)
videosRouter.get('/:id(\\d+)', seeVideos)
videosRouter.route("/:id(\\d+)/edit").get(getEditVideos).post(postEditVideos)
videosRouter.get('/:id(\\d+)/delete', deleteVideos)

export default videosRouter
