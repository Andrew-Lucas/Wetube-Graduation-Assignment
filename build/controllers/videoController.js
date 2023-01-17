"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchVideo = exports.searchVideo = exports.registerView = exports.postUpload = exports.postEditVideos = exports.handleHome = exports.getUpload = exports.getEditVideos = exports.deleteVideos = exports.deleteComment = exports.addComment = void 0;
var _Video = _interopRequireDefault(require("../models/Video"));
var _Users = _interopRequireDefault(require("../models/Users"));
var _Comments = _interopRequireDefault(require("../models/Comments"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var handleHome = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var Videos;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _Video["default"].find({}).sort({
            DateCreated: 'desc'
          }).populate('owner');
        case 3:
          Videos = _context.sent;
          res.render('index', {
            pageTitle: 'Home Page',
            Videos: Videos
          });
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log('❌ DB ERROR::', _context.t0);
          res.send('<h1>Sorry, an error occured!!!</h1>');
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function handleHome(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.handleHome = handleHome;
var getUpload = function getUpload(req, res) {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  return res.render('videos/upload', {
    pageTitle: "Upload Video"
  });
};
exports.getUpload = getUpload;
var postUpload = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _id, file, _req$body, uploadedTitle, uploadDescription, hashtagsNew, newVideo, user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
          _id = req.session.user._id;
          file = req.file;
          _req$body = req.body, uploadedTitle = _req$body.uploadedTitle, uploadDescription = _req$body.uploadDescription, hashtagsNew = _req$body.hashtagsNew;
          _context2.prev = 5;
          _context2.next = 8;
          return _Video["default"].create({
            videoURL: file.path,
            title: uploadedTitle,
            description: uploadDescription,
            hashtags: hashtagsNew,
            owner: _id
          });
        case 8:
          newVideo = _context2.sent;
          _context2.next = 11;
          return _Users["default"].findById(_id);
        case 11:
          user = _context2.sent;
          user.userVideos.push(newVideo._id);
          user.save();
          return _context2.abrupt("return", res.redirect('/'));
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](5);
          console.log('There was an error::', _context2.t0);
          req.flash('error', 'Description is too short');
          return _context2.abrupt("return", res.render('videos/upload', {
            pageTitle: "Upload Video",
            ErrorMessage: _context2.t0._message
          }));
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[5, 17]]);
  }));
  return function postUpload(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.postUpload = postUpload;
var searchVideo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var keyword, searchedVideos;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          keyword = req.query.keyword;
          searchedVideos = [];
          if (!keyword) {
            _context3.next = 6;
            break;
          }
          _context3.next = 5;
          return _Video["default"].find({
            title: {
              $regex: new RegExp(keyword, 'i')
            }
          });
        case 5:
          searchedVideos = _context3.sent;
        case 6:
          res.render('videos/SearchVideos', {
            pageTitle: 'Search Videos',
            searchedVideos: searchedVideos,
            keyword: keyword
          });
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function searchVideo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.searchVideo = searchVideo;
var comments = comments || {};
var watchVideo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, userID, videoSelected, userComments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          userID = req.session.user._id;
          _context4.next = 5;
          return _Video["default"].findById(id).populate('owner').populate('comments');
        case 5:
          videoSelected = _context4.sent;
          if (videoSelected) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).render('404', {
            pageTitle: 'Video not found'
          }));
        case 8:
          comments = videoSelected.comments;
          userComments = comments.filter(function (comment) {
            return String(comment.owner) === String(userID);
          });
          return _context4.abrupt("return", res.render('videos/watch', {
            pageTitle: "Watching ".concat(videoSelected.title),
            videoSelected: videoSelected,
            userID: userID,
            newCommentId: comments._id,
            userComments: userComments,
            newOwner: comments.owner
          }));
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.log('watch catched error:::', _context4.t0);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function watchVideo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.watchVideo = watchVideo;
var registerView = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, viewedVideo;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return _Video["default"].findById(id);
        case 3:
          viewedVideo = _context5.sent;
          if (viewedVideo) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.sendStatus('404'));
        case 6:
          viewedVideo.meta.views = viewedVideo.meta.views + 1;
          _context5.next = 9;
          return viewedVideo.save();
        case 9:
          return _context5.abrupt("return", res.sendStatus('200'));
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function registerView(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.registerView = registerView;
var getEditVideos = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, videoSelected;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.next = 3;
          return _Video["default"].findById(id);
        case 3:
          videoSelected = _context6.sent;
          if (!(String(videoSelected.owner) !== req.session.user._id)) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(403).redirect('/'));
        case 6:
          if (videoSelected) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", res.render('404', {
            pageTitle: 'Video not found'
          }));
        case 8:
          return _context6.abrupt("return", res.render('videos/edit', {
            pageTitle: "Editing ".concat(videoSelected.title),
            videoSelected: videoSelected
          }));
        case 9:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getEditVideos(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getEditVideos = getEditVideos;
var postEditVideos = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var id, _req$body2, editedTitle, editedDescription, editedHashtag, videoSelected;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, editedTitle = _req$body2.editedTitle, editedDescription = _req$body2.editedDescription, editedHashtag = _req$body2.editedHashtag;
          _context7.next = 4;
          return _Video["default"].findById(id);
        case 4:
          videoSelected = _context7.sent;
          if (videoSelected) {
            _context7.next = 8;
            break;
          }
          req.flash('error', 'You are not the owner of the video');
          return _context7.abrupt("return", res.status(404).render('404', {
            pageTitle: 'Video not found'
          }));
        case 8:
          videoSelected.title = editedTitle;
          videoSelected.description = editedDescription;
          videoSelected.hashtags = editedHashtag;
          _context7.next = 13;
          return videoSelected.save();
        case 13:
          return _context7.abrupt("return", res.redirect("/videos/".concat(id)));
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function postEditVideos(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.postEditVideos = postEditVideos;
var addComment = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var user, text, id, commentedVideo, newComment;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          user = req.session.user, text = req.body.text, id = req.params.id;
          _context8.next = 3;
          return _Video["default"].findById(id);
        case 3:
          commentedVideo = _context8.sent;
          if (commentedVideo) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", res.sendStatus('404'));
        case 6:
          _context8.next = 8;
          return _Comments["default"].create({
            text: text,
            owner: user._id,
            parentVideo: id
          });
        case 8:
          newComment = _context8.sent;
          commentedVideo.comments.push(newComment._id);
          comments = {};
          comments = newComment;
          commentedVideo.save();
          /*   const allComments = await Comment.find()
          console.log("allComments", allComments)
           const eachComment = allComments.find(comment => comment)
          console.log("eachComment", eachComment) */
          return _context8.abrupt("return", res.status('201').json({
            newCommentId: newComment._id,
            newOwner: newComment.owner
          }));
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function addComment(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.addComment = addComment;
var deleteComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var id, videoId, comment, commentToDelete;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          id = req.body.id;
          videoId = req.params;
          _context9.next = 4;
          return _Comments["default"].findById(id);
        case 4:
          comment = _context9.sent;
          if (!(String(req.session.user._id) !== String(comment.owner))) {
            _context9.next = 9;
            break;
          }
          req.flash('error', 'You are not the owner of the comment');
          console.log('You are not the owner of the comment');
          return _context9.abrupt("return", res.sendStatus('400'));
        case 9:
          _context9.next = 11;
          return _Comments["default"].findByIdAndDelete(id);
        case 11:
          commentToDelete = _context9.sent;
          return _context9.abrupt("return", res.sendStatus('200'));
        case 13:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function deleteComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.deleteComment = deleteComment;
var deleteVideos = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var id, videoSelected, videoComments;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          id = req.params.id;
          _context11.next = 3;
          return _Video["default"].findById(id);
        case 3:
          videoSelected = _context11.sent;
          if (!(String(videoSelected.owner) !== req.session.user._id)) {
            _context11.next = 7;
            break;
          }
          req.flash('error', 'You are not the owner of the video');
          return _context11.abrupt("return", res.status(403).redirect('/'));
        case 7:
          if (videoSelected) {
            _context11.next = 9;
            break;
          }
          return _context11.abrupt("return", res.render('404', {
            pageTitle: 'Video not found'
          }));
        case 9:
          _context11.next = 11;
          return videoSelected.comments.map( /*#__PURE__*/function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(comment) {
              var eachVideoComments;
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return _Comments["default"].findByIdAndDelete(comment);
                  case 2:
                    eachVideoComments = _context10.sent;
                  case 3:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            return function (_x21) {
              return _ref11.apply(this, arguments);
            };
          }());
        case 11:
          videoComments = _context11.sent;
          _context11.next = 14;
          return _Video["default"].findByIdAndDelete(id);
        case 14:
          res.redirect('/');
        case 15:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function deleteVideos(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
exports.deleteVideos = deleteVideos;