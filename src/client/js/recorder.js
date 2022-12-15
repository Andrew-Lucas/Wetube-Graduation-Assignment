const recordBtn = document.getElementById("record-button")
const cancelDownloadBtn = document.getElementById("ignore-download")
const recordPreview = document.getElementById("record-preview")

let stream;
let recorder;
let videoFile;

const videoPreview = async ()=>{
  stream = await navigator.mediaDevices.getUserMedia({video:true, audio: true})
  recordPreview.srcObject = stream
  recordPreview.play()
}

const downloadRecording = ()=>{
  const a = document.createElement("a")
  a.href = videoFile
  document.body.appendChild(a)
  a.download = 'My recording.webm'
  a.click()
  cancelDownloadBtn.classList.add("hide-video_preview")
  recordPreview.classList.add("hide-video_preview")
  recordBtn.innerText = "Start recording"
  recordBtn.removeEventListener("click", downloadRecording)
  recordBtn.addEventListener("click", startRecording)
}

const cancelDownload = ()=>{
  recordPreview.classList.add("hide-video_preview")
  cancelDownloadBtn.classList.remove("hide-video_preview")
  recordBtn.innerText = "Start recording"
  recordBtn.removeEventListener("click", downloadRecording)
  recordBtn.addEventListener("click", startRecording)
}

const stopRecording = ()=>{
  recordBtn.innerText = "Download recording"
  cancelDownloadBtn.classList.remove("hide-video_preview")
  recordBtn.removeEventListener("click", stopRecording)
  recordBtn.addEventListener("click", downloadRecording)
  cancelDownloadBtn.addEventListener("click", cancelDownload)
  recorder.stop()
}

videoPreview()
const startRecording = async ()=>{
  recordPreview.classList.remove("hide-video_preview")
  recordBtn.innerText = "Stop recording"
  recordBtn.removeEventListener("click", startRecording)
  recordBtn.addEventListener("click", stopRecording)

  recorder = new MediaRecorder(stream)
  recorder.ondataavailable = (event)=> {
    console.log(event.data)
    videoFile = URL.createObjectURL(event.data)
    recordPreview.srcObject = null
    recordPreview.src = videoFile
    recordPreview.loop = recordPreview.play()
  }
  recorder.start()
}


recordBtn.addEventListener("click", startRecording)
