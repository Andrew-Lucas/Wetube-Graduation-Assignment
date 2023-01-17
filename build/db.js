"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_mongoose["default"].connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = _mongoose["default"].connection;
var dbError = function dbError(error) {
  return console.log("😞DB Error:", error);
};
var operDb = function operDb() {
  return console.log("Connected to DataBase📀");
};
db.on("error", dbError);
db.once("open", operDb);