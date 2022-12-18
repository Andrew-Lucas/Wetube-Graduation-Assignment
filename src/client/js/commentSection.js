import fetch from "node-fetch"

const mainVideoScreen = document.getElementById('main-video-screen')
const commentForm = document.getElementById("comment-form")

const submitCommentForm = async (submitEvent)=>{
  const textArea = commentForm.querySelector("textarea")
  submitEvent.preventDefault()
  const text = textArea.value
  const trimedText = text.trim()
  if(trimedText === ""){
    return
  }
  const videoId = mainVideoScreen.dataset.id
  const comment =  await fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: trimedText,
    }),
  })
  textArea.value = ""
}

if(commentForm){
  commentForm.addEventListener("submit", submitCommentForm)
}
