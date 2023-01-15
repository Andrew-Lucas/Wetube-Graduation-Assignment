import express from 'express'
import { loggedInOnly, guestsOnly, videoUpload } from '../middlewares'
import {
  getUpload,
  postUpload,
  getEditVideos,
  deleteVideos,
  watchVideo,
  postEditVideos,
} from '../controllers/videoController'

const videosRouter = express.Router()

videosRouter.route('/upload').all(loggedInOnly).get(getUpload).post(videoUpload.single("video"), postUpload)
videosRouter.get('/:id([0-9a-z]{24})', watchVideo)
videosRouter
  .route('/:id([0-9a-z]{24})/edit')
  .all(loggedInOnly)
  .get(getEditVideos)
  .post(postEditVideos)
videosRouter.get('/:id([0-9a-z]{24})/delete', loggedInOnly, deleteVideos)

export default videosRouter
