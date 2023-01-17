"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _middlewares = require("../middlewares");
var _userController = require("../controllers/userController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userRouter = _express["default"].Router();
userRouter.get("/github/start", _middlewares.guestsOnly, _userController.startGithubLogin);
userRouter.get("/github/finished", _middlewares.guestsOnly, _userController.finishedGithubLogin);
userRouter.get('/:id([0-9a-z]{24})', _middlewares.loggedInOnly, _userController.viewProfile);
userRouter.route('/:id([0-9a-z]{24})/edit').all(_middlewares.loggedInOnly).get(_userController.getEditProfile).post(_middlewares.avatarUpload.single("avatar"), _userController.postEditProfile);
userRouter.route('/EditMyProfile/ChangePassword').all(_middlewares.loggedInOnly).get(_userController.getChangePassword).post(_userController.postChangePassword);
userRouter.get("/:id([0-9a-z]{24})/logout", _middlewares.loggedInOnly, _userController.logout);
var _default = userRouter;
exports["default"] = _default;