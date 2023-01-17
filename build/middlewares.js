"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoUpload = exports.loggedInOnly = exports.localsMiddleware = exports.guestsOnly = exports.avatarUpload = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals = req.session;
  res.locals.user = req.session.user || {};
  /*   console.log(res.locals.user) */
  next();
};
exports.localsMiddleware = localsMiddleware;
var loggedInOnly = function loggedInOnly(req, res, next) {
  if (!req.session.loggedIn) {
    console.log("For logged in users only");
    return res.redirect("/login");
  } else {
    next();
  }
};
exports.loggedInOnly = loggedInOnly;
var guestsOnly = function guestsOnly(req, res, next) {
  if (req.session.loggedIn) {
    console.log("For guests only");
    return res.redirect("/");
  } else {
    next();
  }
};
exports.guestsOnly = guestsOnly;
var avatarUpload = (0, _multer["default"])({
  dest: 'avatars/',
  limits: {
    fileSize: 3000000
  }
});
exports.avatarUpload = avatarUpload;
var videoUpload = (0, _multer["default"])({
  dest: 'AllVideos/'
});
exports.videoUpload = videoUpload;