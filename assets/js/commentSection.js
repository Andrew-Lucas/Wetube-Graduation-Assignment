/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\n\n// ref: https://github.com/tc39/proposal-global\nvar getGlobal = function () {\n  // the only reliable means to get the global object is\n  // `Function('return this')()`\n  // However, this causes CSP violations in Chrome apps.\n  if (typeof self !== 'undefined') {\n    return self;\n  }\n  if (typeof window !== 'undefined') {\n    return window;\n  }\n  if (typeof __webpack_require__.g !== 'undefined') {\n    return __webpack_require__.g;\n  }\n  throw new Error('unable to locate global object');\n};\nvar globalObject = getGlobal();\nmodule.exports = exports = globalObject.fetch;\n\n// Needed for TypeScript and Webpack.\nif (globalObject.fetch) {\n  exports[\"default\"] = globalObject.fetch.bind(__webpack_require__.g);\n}\nexports.Headers = globalObject.Headers;\nexports.Request = globalObject.Request;\nexports.Response = globalObject.Response;\n\n//# sourceURL=webpack://wetube/./node_modules/node-fetch/browser.js?");

/***/ }),

/***/ "./src/client/js/commentSection.js":
/*!*****************************************!*\
  !*** ./src/client/js/commentSection.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_0__);\n\nconst mainVideoScreen = document.getElementById('main-video-screen');\nconst commentForm = document.getElementById(\"comment-form\");\nconst commentSpan = document.querySelector(\"#comment-span\");\nconst deleteCommentBtns = document.querySelectorAll(\"#delete-comment\");\nconst deleteComment = async event => {\n  console.log(\"Deleted\");\n  const item = event.target.parentElement;\n  const {\n    id\n  } = item.dataset;\n  item.remove();\n  const videoId = mainVideoScreen.dataset.id;\n  const commentToDelete = await node_fetch__WEBPACK_IMPORTED_MODULE_0___default()(`/api/videos/${videoId}/comment/delete`, {\n    method: 'DELETE',\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      id\n    })\n  });\n};\nconst showComments = (text, newCommentId, newOwner) => {\n  const commentsSection = document.querySelector(\".comments-section\");\n  const commentsUl = commentsSection.querySelector(\".comments-ul\");\n  const commentsLi = document.createElement(\"li\");\n  if (!commentsLi) {\n    const commentsLi = document.createElement(\"span\");\n    commentsLi.dataset.id = \"\";\n  }\n  commentsLi.dataset.id = newCommentId;\n  commentsLi.className = \"comments-li\";\n  const commentsSpan = document.createElement(\"span\");\n  commentsSpan.id = \"comment-span\";\n  const deleteBtn = document.createElement(\"button\");\n  deleteBtn.id = \"delete-comment\";\n  deleteBtn.innerText = \"❌\";\n  commentsLi.appendChild(commentsSpan);\n  commentsLi.appendChild(deleteBtn);\n  commentsUl.prepend(commentsLi);\n  commentsSpan.innerText = text;\n  commentsSpan.dataset.owner = newOwner;\n  deleteBtn.addEventListener(\"click\", deleteComment);\n};\nif (deleteCommentBtns) {\n  deleteCommentBtns.forEach(deleteBtn => {\n    console.log(deleteBtn);\n    deleteBtn.addEventListener(\"click\", deleteComment);\n  });\n}\nconst submitCommentForm = async submitEvent => {\n  const textArea = commentForm.querySelector(\"textarea\");\n  submitEvent.preventDefault();\n  const text = textArea.value;\n  const trimedText = text.trim();\n  if (trimedText === \"\") {\n    return;\n  }\n  const videoId = mainVideoScreen.dataset.id;\n  const commentResponse = await node_fetch__WEBPACK_IMPORTED_MODULE_0___default()(`/api/videos/${videoId}/comment`, {\n    method: 'POST',\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      text: trimedText\n    })\n  });\n  const {\n    newCommentId,\n    newOwner\n  } = await commentResponse.json();\n  if (commentResponse.status === 201) {\n    showComments(text, newCommentId, newOwner);\n  }\n  textArea.value = \"\";\n};\nif (commentForm) {\n  commentForm.addEventListener(\"submit\", submitCommentForm);\n}\n\n//# sourceURL=webpack://wetube/./src/client/js/commentSection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/js/commentSection.js");
/******/ 	
/******/ })()
;