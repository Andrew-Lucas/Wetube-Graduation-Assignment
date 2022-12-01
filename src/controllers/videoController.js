import Video from "../models/Video"

export const handleHome = async (req, res) => {
  Video.find(err, videoDoc)
  console.log(videoDoc)
  console.log(err)
  await res.render('home', {pageTitle: "Home Page", videoDoc})
}

export const getEditVideos = (req, res) =>{
  const {id} = req.params
  res.render('edit', {pageTitle: `Editing`})
}

export const postEditVideos = (req, res) =>{
  const {id} = req.params
  const {title} = req.body
  return res.redirect(`/videos/${id}`)
}

export const seeVideos = (req, res) =>{
  const {id} = req.params
  const videoSelected = videoDetails[id-1]
  return res.render('watch', {pageTitle: `Watching`})
}

export const getUpload = (req, res) => {
  return res.render('upload', {pageTitle: `Upload Video`})
}
export const postUpload = (req, res) => {
 // here we are going to add videos on 2023
 console.log(req.body)
 const { uploadedTitle } = req.body
 return res.redirect("/")
}

export const deleteVideos = (req, res) => res.send('Delete Videos') 

export const search = (req, res)=> res.send("Search")
