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

/***/ "./src/client/js/recorder.js":
/*!***********************************!*\
  !*** ./src/client/js/recorder.js ***!
  \***********************************/
/***/ (() => {

eval("const recordBtn = document.getElementById(\"record-button\");\nconst cancelDownloadBtn = document.getElementById(\"ignore-download\");\nconst recordPreview = document.getElementById(\"record-preview\");\nlet stream;\nlet recorder;\nlet videoFile;\nconst videoPreview = async () => {\n  stream = await navigator.mediaDevices.getUserMedia({\n    video: true,\n    audio: true\n  });\n  recordPreview.srcObject = stream;\n  recordPreview.play();\n};\nconst downloadRecording = () => {\n  const a = document.createElement(\"a\");\n  a.href = videoFile;\n  document.body.appendChild(a);\n  a.download = 'My recording.webm';\n  a.click();\n  cancelDownloadBtn.classList.add(\"hide-video_preview\");\n  recordPreview.classList.add(\"hide-video_preview\");\n  recordBtn.innerText = \"Start recording\";\n  recordBtn.removeEventListener(\"click\", downloadRecording);\n  recordBtn.addEventListener(\"click\", startRecording);\n};\nconst cancelDownload = () => {\n  recordPreview.classList.add(\"hide-video_preview\");\n  cancelDownloadBtn.classList.remove(\"hide-video_preview\");\n  recordBtn.innerText = \"Start recording\";\n  recordBtn.removeEventListener(\"click\", downloadRecording);\n  recordBtn.addEventListener(\"click\", startRecording);\n};\nconst stopRecording = () => {\n  recordBtn.innerText = \"Download recording\";\n  cancelDownloadBtn.classList.remove(\"hide-video_preview\");\n  recordBtn.removeEventListener(\"click\", stopRecording);\n  recordBtn.addEventListener(\"click\", downloadRecording);\n  cancelDownloadBtn.addEventListener(\"click\", cancelDownload);\n  recorder.stop();\n};\nvideoPreview();\nconst startRecording = async () => {\n  recordPreview.classList.remove(\"hide-video_preview\");\n  recordBtn.innerText = \"Stop recording\";\n  recordBtn.removeEventListener(\"click\", startRecording);\n  recordBtn.addEventListener(\"click\", stopRecording);\n  recorder = new MediaRecorder(stream);\n  recorder.ondataavailable = event => {\n    console.log(event.data);\n    videoFile = URL.createObjectURL(event.data);\n    recordPreview.srcObject = null;\n    recordPreview.src = videoFile;\n    recordPreview.loop = recordPreview.play();\n  };\n  recorder.start();\n};\nrecordBtn.addEventListener(\"click\", startRecording);\n\n//# sourceURL=webpack://wetube/./src/client/js/recorder.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/recorder.js"]();
/******/ 	
/******/ })()
;