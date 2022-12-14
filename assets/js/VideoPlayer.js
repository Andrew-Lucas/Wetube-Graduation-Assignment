/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/VideoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/VideoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const video = document.getElementById(\"video\");\nconst playBtn = document.getElementById(\"playBtn\");\nconst playBtnIcon = playBtn.querySelector(\"i\");\nconst muteBtn = document.getElementById(\"muteBtn\");\nconst muteBtnIcon = muteBtn.querySelector(\"i\");\nconst currentTimeString = document.getElementById(\"current-time\");\nconst durationString = document.getElementById(\"duration\");\nconst volumeRange = document.getElementById(\"volume\");\nconst timeLine = document.getElementById(\"video-time_line\");\nconst toogleScreenButton = document.getElementById(\"screen-size-btn\");\nconst fullScreenIcon = toogleScreenButton.querySelector(\"i\");\nconst mainVideoScreen = document.getElementById(\"main-video-screen\");\nconst videoControls = document.getElementById(\"videoControls\");\nvideo.volume = 0.5;\nlet volumeValue = 0.5;\nfunction handlePlayState() {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n  playBtnIcon.classList = video.paused ? \"fas fa-play\" : \"fas fa-pause\";\n}\nfunction handleVolumeChange(changeEvent) {\n  const {\n    target: {\n      value\n    }\n  } = changeEvent;\n  video.volume = value;\n  volumeValue = value;\n  video.muted = false;\n  muteBtnIcon.classList = \"fas fa-volume-up\";\n  if (volumeRange.value == 0) {\n    muteBtnIcon.classList = \"fas fa-volume-mute\";\n  }\n}\nfunction handleMute() {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n  volumeRange.value = video.muted ? 0 : volumeValue;\n  muteBtnIcon.classList = video.muted ? \"fas fa-volume-mute\" : \"fas fa-volume-up\";\n}\nconst formatTime = time => new Date(time * 1000).toISOString().substr(11, 8);\nfunction handleLoadedMetedata() {\n  durationString.innerText = formatTime(Math.floor(video.duration));\n  timeLine.max = Math.floor(video.duration);\n}\nfunction handleTimeUpdate() {\n  currentTimeString.innerText = formatTime(Math.floor(video.currentTime));\n  timeLine.value = Math.floor(video.currentTime);\n}\nfunction handleTimeline(event) {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  video.currentTime = value;\n}\nfunction toogleScreenSize() {\n  const fullScreen = document.fullscreenElement;\n  if (fullScreen) {\n    document.exitFullscreen();\n    fullScreenIcon.classList = \"fas fa-expand\";\n  } else {\n    mainVideoScreen.requestFullscreen();\n    fullScreenIcon.classList = \"fas fa-compress\";\n  }\n}\ndocument.body.onkeyup = function (e) {\n  if (e.key == \" \" || e.code == \"Space\" || e.keyCode == 32) {\n    handlePlayState();\n  }\n};\nlet controlsTimeout = null;\nlet controlsMovementTimeout = null;\nconst hideControls = () => videoControls.classList.remove(\"showing\");\nconst handleMouseMove = () => {\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout);\n    controlsTimeout = null;\n  }\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n  videoControls.classList.add(\"showing\");\n  controlsMovementTimeout = setTimeout(hideControls, 3000);\n};\nconst handleMouseLeave = () => {\n  controlsTimeout = setTimeout(hideControls, 3000);\n};\nplayBtn.addEventListener(\"click\", handlePlayState);\nmuteBtn.addEventListener(\"click\", handleMute);\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\nvideo.addEventListener(\"loadedmetadata\", handleLoadedMetedata);\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\ntimeLine.addEventListener(\"input\", handleTimeline);\ntoogleScreenButton.addEventListener(\"click\", toogleScreenSize);\nmainVideoScreen.addEventListener(\"mousemove\", handleMouseMove);\nmainVideoScreen.addEventListener(\"mouseleave\", handleMouseLeave);\nvideo.addEventListener(\"click\", handlePlayState);\n\n//# sourceURL=webpack://wetube/./src/client/js/VideoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/VideoPlayer.js"]();
/******/ 	
/******/ })()
;