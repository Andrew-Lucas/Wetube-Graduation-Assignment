export const handleHome = (req, res) => res.render('home')

export const editVideos = (req, res) => res.send('Edit Videos')
export const seeVideos = (req, res) => {
  console.log(req.params)
  res.render('watch')
}
export const search = (req, res)=> res.send("Search")
export const upload = (req, res) => res.send('Upload Videos')
export const deleteVideos = (req, res) => res.send('Delete Videos') 
