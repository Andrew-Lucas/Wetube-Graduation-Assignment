import express from "express"
import {getUpload, postUpload ,getEditVideos, deleteVideos, seeVideos, postEditVideos} from "../controllers/videoController"


const videosRouter = express.Router()


videosRouter.route('/upload').get(getUpload).post(postUpload)
videosRouter.get('/:id([0-9a-z]{24})', seeVideos)
videosRouter.route("/:id([0-9a-z]{24})/edit").get(getEditVideos).post(postEditVideos)
videosRouter.get('/:id([0-9a-z]{24})/delete', deleteVideos)

export default videosRouter
