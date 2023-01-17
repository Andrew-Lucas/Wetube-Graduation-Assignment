"use strict";

var _config = _interopRequireDefault(require("dotenv/config"));
require("./db");
require("./models/Video");
require("./models/Users");
require("./models/Comments");
var _express = _interopRequireDefault(require("express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _expressFlash = _interopRequireDefault(require("express-flash"));
var _morgan = _interopRequireDefault(require("morgan"));
var _middlewares = require("./middlewares");
var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));
var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var logger = (0, _morgan["default"])('dev');
var app = (0, _express["default"])();
var PORT = 7000;
app.use(logger);
app.set('views', process.cwd() + '/src/views');
app.set('view engine', 'pug');
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: _connectMongo["default"].create({
    mongoUrl: process.env.MONGO_URL
  })
}));
app.use(function (req, res, next) {
  req.sessionStore.all(function (error, session) {
    next();
  });
});
app.use((0, _expressFlash["default"])());
app.use(_middlewares.localsMiddleware);
app.use('/avatars', _express["default"]["static"]('avatars'));
app.use('/AllVideos', _express["default"]["static"]('AllVideos'));
app.use('/assets', _express["default"]["static"]('assets'));
app.use('/', _globalRouter["default"]);
app.use('/user', _userRouter["default"]);
app.use('/videos', _videoRouter["default"]);
app.use('/api', _apiRouter["default"]);
app.listen(PORT, function () {
  return console.log("\u2705Server listening from http://localhost:".concat(PORT));
});