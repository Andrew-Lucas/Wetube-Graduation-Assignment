import express from 'express'
import { protectedMiddleware, publicOnlyMiddleware } from '../middlewares'
import {
  getUpload,
  postUpload,
  getEditVideos,
  deleteVideos,
  seeVideos,
  postEditVideos,
} from '../controllers/videoController'

const videosRouter = express.Router()

videosRouter.route('/upload').all(protectedMiddleware).get(getUpload).post(postUpload)
videosRouter.get('/:id([0-9a-z]{24})', seeVideos)
videosRouter
  .route('/:id([0-9a-z]{24})/edit')
  .all(protectedMiddleware)
  .get(getEditVideos)
  .post(postEditVideos)
videosRouter.get('/:id([0-9a-z]{24})/delete', protectedMiddleware, deleteVideos)

export default videosRouter
