import Video from '../models/Video'
import User from '../models/Users'
import Comment from '../models/Comments'

export const handleHome = async (req, res) => {
  /*   const { id } = req.params
  const videoSelected = await Video.findById(id).populate("owner") */
  try {
    const Videos = await Video.find({})
      .sort({ DateCreated: 'desc' })
      .populate('owner')
    res.render('home', { pageTitle: 'Home Page', Videos /* videoSelected */ })
  } catch (err) {
    console.log('❌ DB ERROR::', err)
    res.send('<h1>Sorry, an error occured!!!</h1>')
  }
}

export const getEditVideos = async (req, res) => {
  const { id } = req.params
  const videoSelected = await Video.findById(id)
  if (String(videoSelected.owner) !== req.session.user._id) {
    return res.status(403).redirect('/')
  }
  if (!videoSelected) {
    return res.render('404', { pageTitle: 'Video not found' })
  }
  return res.render('videos/edit', {
    pageTitle: `Editing ${videoSelected.title}`,
    videoSelected,
  })
}

export const postEditVideos = async (req, res) => {
  const { id } = req.params
  const { editedTitle, editedDescription, editedHashtag } = req.body
  const videoSelected = await Video.findById(id)
  if (!videoSelected) {
    req.flash('error', 'You are not the owner of the video')
    return res.status(404).render('404', { pageTitle: 'Video not found' })
  }
  videoSelected.title = editedTitle
  videoSelected.description = editedDescription
  videoSelected.hashtags = editedHashtag
  await videoSelected.save()
  return res.redirect(`/videos/${id}`)
}

let comments = comments || {}
export const seeVideos = async (req, res) => {
  try {
    const { id } = req.params
    const userID = req.session.user._id
    const videoSelected = await Video.findById(id)
      .populate('owner')
      .populate('comments')
    if (!videoSelected) {
      return res.status(404).render('404', { pageTitle: 'Video not found' })
    }

    /*     const comment = await Comment.findById(commentId) */
    /*     console.log(commentToDelete) */

    const commentOwner = String(comments.owner) || ""
    console.log(userID)
    console.log(commentOwner)

    return res.render('videos/watch', {
      pageTitle: `Watching ${videoSelected.title}`,
      videoSelected,
      userID,
      newCommentId: comments._id, 
      commentOwner,
      newOwner: comments.owner
    })
  } catch (err) {
    console.log('watch catched error:::', err)
  }
}

export const getUpload = (req, res) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
  return res.render('videos/upload', { pageTitle: `Upload Video` })
}

export const postUpload = async (req, res) => {
  // here we are going to add videos on 2023
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
  const {
    user: { _id },
  } = req.session
  const file = req.file
  const { uploadedTitle, uploadDescription, hashtagsNew } = req.body
  try {
    const newVideo = await Video.create({
      videoURL: file.path,
      title: uploadedTitle,
      description: uploadDescription,
      hashtags: hashtagsNew,
      owner: _id,
    })
    const user = await User.findById(_id)
    user.userVideos.push(newVideo._id)
    user.save()
    console.log(user)
    return res.redirect('/')
  } catch (err) {
    console.log('There was an error::', err)
    req.flash('error', 'Description is too short')
    return res.render('videos/upload', {
      pageTitle: `Upload Video`,
      ErrorMessage: err._message,
    })
  }
}

export const deleteVideos = async (req, res) => {
  const { id } = req.params
  await Video.findByIdAndDelete(id)
  const videoSelected = await Video.findById(id)
  console.log(videoSelected)
  if (String(videoSelected.owner) !== req.session.user._id) {
    req.flash('error', 'You are not the owner of the video')
    return res.status(403).redirect('/')
  }
  if (!videoSelected) {
    return res.render('404', { pageTitle: 'Video not found' })
  }
  res.redirect('/')
}

export const searchVideo = async (req, res) => {
  const { keyword } = req.query
  let searchedVideos = []
  if (keyword) {
    searchedVideos = await Video.find({
      title: {
        $regex: new RegExp(keyword, 'i'),
      },
    })
  }
  res.render('videos/SearchVideos', {
    pageTitle: 'Search Videos',
    searchedVideos,
    keyword,
  })
}

export const registerView = async (req, res) => {
  const { id } = req.params
  const viewedVideo = await Video.findById(id)
  if (!viewedVideo) {
    return res.sendStatus('404')
  }
  viewedVideo.meta.views = viewedVideo.meta.views + 1
  await viewedVideo.save()
  return res.sendStatus('200')
}

export const addComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req
  const commentedVideo = await Video.findById(id)
  if (!commentedVideo) {
    return res.sendStatus('404')
  }
  const newComment = await Comment.create({
    text,
    owner: user._id,
    parentVideo: id,
  })
  commentedVideo.comments.push(newComment._id)
  comments = {}
  comments = newComment
  commentedVideo.save()
  return res.status('201').json({ newCommentId: newComment._id, newOwner: newComment.owner })
  /*   console.log(newComment) */
}

export const deleteComment = async (req, res) => {
  console.log('Fetch delete worked')
  const { id } = req.body
  const videoId = req.params
  const comment = await Comment.findById(id)
  console.log("session::", String(req.session.user._id))
  console.log("owner::", String(comment.owner))
  if (String(req.session.user._id) !== String(comment.owner)) {
    req.flash('error', 'You are not the owner of the comment')
    console.log('You are not the owner of the comment')
    return res.sendStatus('400')
  }
  const commentToDelete = await Comment.findByIdAndDelete(id)

  /*   const commentedVideo = await Video.findById(id) */
  /*   commentedVideo.save() */
  return res.sendStatus('200')
}
