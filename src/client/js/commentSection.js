import fetch from "node-fetch"

const commentForm = document.getElementById("comment-form")
const textArea = commentForm.querySelector("textarea")

const submitCommentForm = (submitEvent)=>{
  submitEvent.preventDefault()
  const text = textArea.value
  console.log(text)
}


commentForm.addEventListener("submit", submitCommentForm)



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  