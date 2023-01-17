"use strict";

var video = document.getElementById('video');
var playBtn = document.getElementById('playBtn');
var playBtnIcon = playBtn.querySelector('i');
var muteBtn = document.getElementById('muteBtn');
var muteBtnIcon = muteBtn.querySelector('i');
var currentTimeString = document.getElementById('current-time');
var durationString = document.getElementById('duration');
var volumeRange = document.getElementById('volume');
var timeLine = document.getElementById('video-time_line');
var toogleScreenButton = document.getElementById('screen-size-btn');
var fullScreenIcon = toogleScreenButton.querySelector('i');
var mainVideoScreen = document.getElementById('main-video-screen');
var videoControls = document.getElementById('videoControls');
var commentForm = document.getElementById('comment-form');
video.volume = 0.5;
var volumeValue = 0.5;
function handlePlayState() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause';
}
function handleVolumeChange(changeEvent) {
  var value = changeEvent.target.value;
  video.volume = value;
  volumeValue = value;
  video.muted = false;
  muteBtnIcon.classList = 'fas fa-volume-up';
  if (volumeRange.value == 0) {
    muteBtnIcon.classList = 'fas fa-volume-mute';
  }
}
function handleMute() {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  volumeRange.value = video.muted ? 0 : volumeValue;
  muteBtnIcon.classList = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
}
var formatTime = function formatTime(time) {
  return new Date(time * 1000).toISOString().substr(11, 8);
};
function handleLoadedMetedata() {
  durationString.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
}
function handleTimeUpdate() {
  currentTimeString.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
}
function handleTimeline(event) {
  var value = event.target.value;
  video.currentTime = value;
}
function toogleScreenSize() {
  var fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = 'fas fa-expand';
  } else {
    mainVideoScreen.requestFullscreen();
    fullScreenIcon.classList = 'fas fa-compress';
  }
}
var body = document.querySelector("body");
body.addEventListener("keydown", function (e) {
  var isInput = ~["TEXTAREA", "INPUT"].indexOf(e.target.tagName);
  if (e.key === " " && !isInput) {
    // resetUI();
    handlePlayState();
  }
});
var controlsTimeout = null;
var controlsMovementTimeout = null;
var hideControls = function hideControls() {
  return videoControls.classList.remove('showing');
};
var handleMouseMove = function handleMouseMove() {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add('showing');
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
var handleMouseLeave = function handleMouseLeave() {
  controlsTimeout = setTimeout(hideControls, 3000);
};
var id = mainVideoScreen.dataset.id;
var handleAddView = function handleAddView() {
  fetch("/api/videos/".concat(id, "/view"), {
    method: 'POST'
  });
  console.log('Video finished');
};
playBtn.addEventListener('click', handlePlayState);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleVolumeChange);
video.addEventListener('loadedmetadata', handleLoadedMetedata);
video.addEventListener('timeupdate', handleTimeUpdate);
video.addEventListener('click', handlePlayState);
video.addEventListener('ended', handleAddView);
timeLine.addEventListener('input', handleTimeline);
toogleScreenButton.addEventListener('click', toogleScreenSize);
mainVideoScreen.addEventListener('mousemove', handleMouseMove);
mainVideoScreen.addEventListener('mouseleave', handleMouseLeave);