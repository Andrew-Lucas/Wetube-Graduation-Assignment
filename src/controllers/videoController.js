const userObject = {
  username: "Andrew",
  loggedIn: true
}

const videos = [1,2,3]

let videoDetails = [
  {
    title: "First video",
    rating: 3,
    views: 23,
    comments: 23,
    subscribers: "1K",
    id: 1
  },
  {
    title: "Second video",
    rating: 4,
    views: 15,
    comments: 270,
    subscribers: "13K",
    id: 2
  },
  {
    title: "Third video",
    rating: 5,
    views: 2,
    comments: 700 ,
    subscribers: "102K",
    id: 3
  }
]

export const handleHome = (req, res) => res.render('home', {pageTitle: "Home Page", userObject, videos, videoDetails,})

export const getEditVideos = (req, res) =>{
  const {id} = req.params
  const videoSelected = videoDetails[id-1]
   res.render('edit', {pageTitle: `Editing ${videoSelected.title}`, videoSelected})
}

export const postEditVideos = (req, res) =>{
  const {id} = req.params
  const {title} = req.body
  videoDetails[id-1].title = title
  return res.redirect(`/videos/${id}`)
}

export const seeVideos = (req, res) =>{
  const {id} = req.params
  const videoSelected = videoDetails[id-1]
  return res.render('watch', {videoDetails, pageTitle: `Watching ${videoSelected.title}`, videoSelected})
}

export const getUpload = (req, res) => {
  return res.render('upload', {pageTitle: `Upload Video`})
}
export const postUpload = (req, res) => {
 // here we are going to add videos on 2023
 console.log(req.body)
 const { uploadedTitle } = req.body
 const newVideo = {
   title: uploadedTitle,
   rating: 0,
   views: 0,
   comments: 0,
   subscribers: "0",
   id: videoDetails.length+1
 }
 videoDetails.push(newVideo)
 return res.redirect("/")
}

export const deleteVideos = (req, res) => res.send('Delete Videos') 

export const search = (req, res)=> res.send("Search")
