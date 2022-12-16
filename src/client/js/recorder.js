import {createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg"
const recordBtn = document.getElementById("record-button")
const cancelDownloadBtn = document.getElementById("ignore-download")
const recordPreview = document.getElementById("record-preview")

let stream;
let recorder;
let videoFile;

const videoPreview = async ()=>{
  stream = await navigator.mediaDevices.getUserMedia({video:true})
  recordPreview.srcObject = stream
  recordPreview.play()
}

const downloadRecording = async ()=>{
  recordBtn.innerText = "Downloading..."
  const ffmpeg = createFFmpeg({ log: true })
  await ffmpeg.load()

  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile))
  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4")

  await ffmpeg.run("-i", "recording.webm", "-ss", "00:00:01", "-frames:v", "1", "thumbnail.jpg")

  const mp4File = ffmpeg.FS("readFile", "output.mp4")
  const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg")

  console.log(mp4File)
  console.log(mp4File.buffer)

 const mp4Blob = new Blob([mp4File.buffer], {type: "video/mp4"})
 const thumbBlob = new Blob([thumbFile.buffer], {type: "image/jpg"})

  const mp4Url = URL.createObjectURL(mp4Blob)
  const thumbUrl = URL.createObjectURL(thumbBlob)

  const a = document.createElement("a")
  a.href = mp4Url
  document.body.appendChild(a)
  a.download = 'MyRecording.mp4'
  a.click()

  const thumbA = document.createElement("a")
  thumbA.href = thumbUrl
  document.body.appendChild(thumbA)
  thumbA.download = 'thumbnail.jpg'
  thumbA.click()

  cancelDownloadBtn.classList.add("hide-video_preview")
  recordPreview.classList.add("hide-video_preview")
  recordBtn.innerText = "Start recording"
  recordBtn.removeEventListener("click", downloadRecording)
  recordBtn.addEventListener("click", startRecording)
} 

const cancelDownload = ()=>{
  recordPreview.classList.add("hide-video_preview")
  cancelDownloadBtn.classList.add("hide-video_preview")
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
    console.log(videoFile)
    recordPreview.srcObject = null
    recordPreview.src = videoFile
    recordPreview.loop = recordPreview.play()
  }
  recorder.start()
}


recordBtn.addEventListener("click", startRecording)
