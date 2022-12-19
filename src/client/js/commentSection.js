import fetch from "node-fetch"

const mainVideoScreen = document.getElementById('main-video-screen')
const commentForm = document.getElementById("comment-form")

const deleteCommentBtn = document.getElementById("delete-comment")

const deleteComment = async (event)=>{
  const item = event.target.parentElement
  const {id} = item.dataset
  const videoId = mainVideoScreen.dataset.id
  const commentToDelete = await fetch(`/api/videos/${videoId}/comment/delete`, {
  method: 'DELETE',
  headers:{
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    id,
  }),
})
  item.remove()
}


if(deleteCommentBtn){
  deleteCommentBtn.addEventListener("click", deleteComment)
}


const showComments = (text, newCommentId)=>{
  const commentsSection = document.querySelector(".comments-section")
  const commentsUl = commentsSection.querySelector(".comments-ul")
  const commentsLi = document.createElement("li")
  commentsLi.dataset.id = newCommentId
  const commentsSpan = document.createElement("span")
  commentsSpan.innerText = text
  const deleteBtn = document.createElement("button")
  deleteBtn.innerText = "❌"
  commentsLi.appendChild(commentsSpan)
  commentsLi.appendChild(deleteBtn)
  commentsUl.prepend(commentsLi)
  
  deleteBtn.addEventListener("click", deleteComment)
}


const submitCommentForm = async (submitEvent)=>{
  const textArea = commentForm.querySelector("textarea")
  submitEvent.preventDefault()
  const text = textArea.value
  const trimedText = text.trim()
  if(trimedText === ""){
    return
  }
  const videoId = mainVideoScreen.dataset.id
  const commentResponse = await fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: trimedText,
    }),
  })
  const {newCommentId} = await commentResponse.json()
  if(commentResponse.status === 201){
    showComments(text, newCommentId)
  }
  textArea.value = ""
}

if(commentForm){
  commentForm.addEventListener("submit", submitCommentForm)
}
