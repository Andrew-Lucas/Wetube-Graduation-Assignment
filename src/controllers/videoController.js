const userObject = {
  username: "Andrew",
  loggedIn: true
}

export const handleHome = (req, res) => res.render('home', {pageTitle: "Home Page", userObject,})
export const editVideos = (req, res) => res.render('edit', {pageTitle: "Edit Videos"})
export const seeVideos = (req, res) => res.render('watch', {videoId: req.params.id, pageTitle: "Watch Videos"})
export const search = (req, res)=> res.send("Search")
export const upload = (req, res) => res.send('Upload Videos')
export const deleteVideos = (req, res) => res.send('Delete Videos') 
