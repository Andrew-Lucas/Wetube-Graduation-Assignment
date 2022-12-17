const video = document.getElementById('video')
const playBtn = document.getElementById('playBtn')
const playBtnIcon = playBtn.querySelector('i')
const muteBtn = document.getElementById('muteBtn')
const muteBtnIcon = muteBtn.querySelector('i')
const currentTimeString = document.getElementById('current-time')
const durationString = document.getElementById('duration')
const volumeRange = document.getElementById('volume')
const timeLine = document.getElementById('video-time_line')
const toogleScreenButton = document.getElementById('screen-size-btn')
const fullScreenIcon = toogleScreenButton.querySelector('i')
const mainVideoScreen = document.getElementById('main-video-screen')
const videoControls = document.getElementById('videoControls')

const commentForm = document.getElementById('comment-form')
const textArea = commentForm.querySelector('textarea')

video.volume = 0.5
let volumeValue = 0.5

function handlePlayState() {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause'
}

function handleVolumeChange(changeEvent) {
  const {
    target: { value },
  } = changeEvent
  video.volume = value
  volumeValue = value
  video.muted = false
  muteBtnIcon.classList = 'fas fa-volume-up'
  if (volumeRange.value == 0) {
    muteBtnIcon.classList = 'fas fa-volume-mute'
  }
}

function handleMute() {
  if (video.muted) {
    video.muted = false
  } else {
    video.muted = true
  }
  volumeRange.value = video.muted ? 0 : volumeValue
  muteBtnIcon.classList = video.muted
    ? 'fas fa-volume-mute'
    : 'fas fa-volume-up'
}

const formatTime = (time) => new Date(time * 1000).toISOString().substr(11, 8)

function handleLoadedMetedata() {
  durationString.innerText = formatTime(Math.floor(video.duration))
  timeLine.max = Math.floor(video.duration)
}

function handleTimeUpdate() {
  currentTimeString.innerText = formatTime(Math.floor(video.currentTime))
  timeLine.value = Math.floor(video.currentTime)
}

function handleTimeline(event) {
  const {
    target: { value },
  } = event
  video.currentTime = value
}

function toogleScreenSize() {
  const fullScreen = document.fullscreenElement
  if (fullScreen) {
    document.exitFullscreen()
    fullScreenIcon.classList = 'fas fa-expand'
  } else {
    mainVideoScreen.requestFullscreen()
    fullScreenIcon.classList = 'fas fa-compress'
  }
}


var body = document.querySelector("body");
body.addEventListener("keydown",function(e){
  var isInput = ~["TEXTAREA", "INPUT"].indexOf(e.target.tagName);
  if(e.key === " " && !isInput){
    // resetUI();
    handlePlayState()
  }
});


let controlsTimeout = null
let controlsMovementTimeout = null
const hideControls = () => videoControls.classList.remove('showing')

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout)
    controlsTimeout = null
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout)
    controlsMovementTimeout = null
  }
  videoControls.classList.add('showing')
  controlsMovementTimeout = setTimeout(hideControls, 3000)
}

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000)
}

const { id } = mainVideoScreen.dataset
console.log(id)
const handleAddView = () => {
  fetch(`/api/videos/${id}/view`, {
    method: 'POST',
  })

  console.log('Video finished')
}

playBtn.addEventListener('click', handlePlayState)
muteBtn.addEventListener('click', handleMute)
volumeRange.addEventListener('input', handleVolumeChange)
video.addEventListener('loadedmetadata', handleLoadedMetedata)
video.addEventListener('timeupdate', handleTimeUpdate)
video.addEventListener('click', handlePlayState)
video.addEventListener('ended', handleAddView)
timeLine.addEventListener('input', handleTimeline)
toogleScreenButton.addEventListener('click', toogleScreenSize)
mainVideoScreen.addEventListener('mousemove', handleMouseMove)
mainVideoScreen.addEventListener('mouseleave', handleMouseLeave)
