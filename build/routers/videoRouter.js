"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _middlewares = require("../middlewares");
var _videoController = require("../controllers/videoController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var videosRouter = _express["default"].Router();
videosRouter.route('/upload').all(_middlewares.loggedInOnly).get(_videoController.getUpload).post(_middlewares.videoUpload.single("video"), _videoController.postUpload);
videosRouter.get('/:id([0-9a-z]{24})', _videoController.watchVideo);
videosRouter.route('/:id([0-9a-z]{24})/edit').all(_middlewares.loggedInOnly).get(_videoController.getEditVideos).post(_videoController.postEditVideos);
videosRouter.get('/:id([0-9a-z]{24})/delete', _middlewares.loggedInOnly, _videoController.deleteVideos);
var _default = videosRouter;
exports["default"] = _default;