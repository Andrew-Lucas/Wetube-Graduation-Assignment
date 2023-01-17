"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewProfile = exports.startGithubLogin = exports.postLogin = exports.postJoin = exports.postEditProfile = exports.postChangePassword = exports.logout = exports.getLogin = exports.getJoin = exports.getEditProfile = exports.getChangePassword = exports.finishedGithubLogin = void 0;
var _Users = _interopRequireDefault(require("../models/Users"));
var _Video = _interopRequireDefault(require("../models/Video"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _cliOptions = require("gulp-cli/lib/shared/cli-options");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getJoin = function getJoin(req, res) {
  res.render('users/join', {
    pageTitle: "Create Account"
  });
};
exports.getJoin = getJoin;
var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, newName, newUsername, newEmail, newPassword, confirmNewPassword, newLocation, accounts, existingAccount, usernameExists, createdUser;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, newName = _req$body.newName, newUsername = _req$body.newUsername, newEmail = _req$body.newEmail, newPassword = _req$body.newPassword, confirmNewPassword = _req$body.confirmNewPassword, newLocation = _req$body.newLocation;
          _context.prev = 1;
          _context.next = 4;
          return _Users["default"].find({});
        case 4:
          accounts = _context.sent;
          existingAccount = accounts.find(function (account) {
            return account.username === newUsername && account.email === newEmail;
          });
          if (!existingAccount) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).render('users/join', {
            errors: 'This account exists, loggin instead',
            newName: newName,
            newUsername: newUsername,
            newEmail: newEmail,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword,
            newLocation: newLocation
          }));
        case 8:
          _context.next = 10;
          return _Users["default"].findOne({
            username: newUsername
          });
        case 10:
          usernameExists = _context.sent;
          if (!usernameExists) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.status(400).render('users/join', {
            errors: 'This username is not available, try using another username',
            newName: newName,
            newUsername: newUsername,
            newEmail: newEmail,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword,
            newLocation: newLocation
          }));
        case 13:
          if (!(newPassword !== confirmNewPassword)) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(400).render('users/join', {
            errors: 'Your passwords are unmatched',
            newName: newName,
            newUsername: newUsername,
            newEmail: newEmail,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword,
            newLocation: newLocation
          }));
        case 15:
          _context.next = 17;
          return _Users["default"].create({
            name: newName,
            username: newUsername,
            email: newEmail,
            password: newPassword,
            location: newLocation
          });
        case 17:
          createdUser = _context.sent;
          return _context.abrupt("return", res.redirect('/login'));
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).render('users/join', {
            errors: 'An error occured with the server'
          }));
        case 25:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 21]]);
  }));
  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.postJoin = postJoin;
var getLogin = function getLogin(req, res) {
  return res.render("users/login", {
    pageTitle: "Login"
  });
};
exports.getLogin = getLogin;
var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, username, email, password, userExists, correctPassword;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return _Users["default"].findOne({
            username: username
          });
        case 4:
          userExists = _context2.sent;
          if (userExists) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(400).render('users/login', {
            errors: 'There is no account with this username',
            username: username,
            email: email,
            password: password
          }));
        case 7:
          if (!(userExists.email !== email)) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(400).render('users/login', {
            errors: 'This account does not exist, Create an account first then login',
            username: username,
            email: email,
            password: password
          }));
        case 9:
          _context2.next = 11;
          return _bcrypt["default"].compare(password, userExists.password);
        case 11:
          correctPassword = _context2.sent;
          if (correctPassword) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", res.status(400).render('users/login', {
            pageTitle: "Login",
            errors: 'The password is incorrect',
            username: username,
            email: email,
            password: password
          }));
        case 14:
          req.session.loggedIn = true;
          req.session.user = userExists;
          return _context2.abrupt("return", res.redirect("/"));
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](1);
          console.log('There was an error', _context2.t0);
          return _context2.abrupt("return", res.render("users/login", {
            pageTitle: "Login",
            errors: "An error occured with the server"
          }));
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 19]]);
  }));
  return function postLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.postLogin = postLogin;
var startGithubLogin = function startGithubLogin(req, res) {
  var baseUrl = "https://github.com/login/oauth/authorize?";
  var configuration = {
    client_id: process.env.CLIENT_ID,
    scope: "user:email user:location read:user"
  };
  var params = new URLSearchParams(configuration).toString();
  var finalUrl = "".concat(baseUrl).concat(params);
  return res.redirect(finalUrl);
};
exports.startGithubLogin = startGithubLogin;
var finishedGithubLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var baseUrl, configuration, params, finalUrl, data, json, access_token, authUrl, userReq, userReqJson, emailReq, emailReqJson, gitEmails, existingUser, gitUser;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          baseUrl = "https://github.com/login/oauth/access_token";
          configuration = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: req.query.code
          };
          params = new URLSearchParams(configuration).toString();
          finalUrl = "".concat(baseUrl, "?").concat(params);
          _context3.next = 6;
          return (0, _nodeFetch["default"])(finalUrl, {
            method: "POST",
            headers: {
              Accept: "application/json"
            }
          });
        case 6:
          data = _context3.sent;
          _context3.next = 9;
          return data.json();
        case 9:
          json = _context3.sent;
          if (!("access_token" in json)) {
            _context3.next = 49;
            break;
          }
          access_token = json.access_token;
          authUrl = "https://api.github.com/user";
          _context3.next = 15;
          return (0, _nodeFetch["default"])(authUrl, {
            headers: {
              Authorization: "token ".concat(access_token)
            }
          });
        case 15:
          userReq = _context3.sent;
          _context3.next = 18;
          return userReq.json();
        case 18:
          userReqJson = _context3.sent;
          _context3.next = 21;
          return (0, _nodeFetch["default"])("https://api.github.com/user/emails", {
            headers: {
              Authorization: "token ".concat(access_token)
            }
          });
        case 21:
          emailReq = _context3.sent;
          _context3.next = 24;
          return emailReq.json();
        case 24:
          emailReqJson = _context3.sent;
          console.log(userReqJson);
          console.log(emailReqJson);
          gitEmails = emailReqJson.find(function (email) {
            return email.verified === true && email.primary === true;
          });
          if (gitEmails) {
            _context3.next = 30;
            break;
          }
          return _context3.abrupt("return", res.redirect("/login"));
        case 30:
          _context3.next = 32;
          return _Users["default"].findOne({
            email: gitEmails.email
          });
        case 32:
          existingUser = _context3.sent;
          if (!existingUser) {
            _context3.next = 39;
            break;
          }
          req.session.loggedIn = true;
          req.session.user = existingUser;
          return _context3.abrupt("return", res.redirect("/"));
        case 39:
          _context3.next = 41;
          return _Users["default"].create({
            name: userReqJson.name,
            avatarURL: userReqJson.avatar_url,
            username: userReqJson.login,
            email: gitEmails.email,
            password: "",
            githubLogin: true,
            githubID: userReqJson.id,
            location: userReqJson.location
          });
        case 41:
          req.session.loggedIn = true;
          _context3.next = 44;
          return _Users["default"].findOne({
            username: userReqJson.login
          });
        case 44:
          gitUser = _context3.sent;
          req.session.user = gitUser;
          return _context3.abrupt("return", res.redirect("/"));
        case 47:
          _context3.next = 50;
          break;
        case 49:
          res.redirect("login");
        case 50:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function finishedGithubLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.finishedGithubLogin = finishedGithubLogin;
var viewProfile = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, selectedUser;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return _Users["default"].findById(id).populate("userVideos");
        case 3:
          selectedUser = _context4.sent;
          if (selectedUser) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(404).render("404", {
            pageTitle: "User not found"
          }));
        case 6:
          return _context4.abrupt("return", res.render('users/viewProfile', {
            pageTitle: "".concat(selectedUser.name),
            selectedUser: selectedUser
          }));
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function viewProfile(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.viewProfile = viewProfile;
var getEditProfile = function getEditProfile(req, res) {
  return res.render("users/EditProfile", {
    pageTitle: "Edit Profile"
  });
};
exports.getEditProfile = getEditProfile;
var postEditProfile = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$session$user, _id, avatarURL, _req$body3, editName, editUsername, editLocation, file, existingUsername, updatedUser;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$session$user = req.session.user, _id = _req$session$user._id, avatarURL = _req$session$user.avatarURL, _req$body3 = req.body, editName = _req$body3.editName, editUsername = _req$body3.editUsername, editLocation = _req$body3.editLocation, file = req.file;
          _context5.prev = 1;
          _context5.next = 4;
          return _Users["default"].find();
        case 4:
          existingUsername = _context5.sent;
          _context5.next = 7;
          return _Users["default"].findByIdAndUpdate(_id, {
            name: editName,
            avatarURL: file ? file.path : avatarURL,
            username: editUsername,
            location: editLocation
          }, {
            "new": true
          });
        case 7:
          updatedUser = _context5.sent;
          req.session.user = updatedUser;
          return _context5.abrupt("return", res.redirect("/"));
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](1);
          console.log('there was an error in the server', _context5.t0);
          return _context5.abrupt("return", res.status(400).render('users/EditProfile', {
            pageTitle: "Edit Profile",
            errors: "An error occured in the server"
          }));
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return function postEditProfile(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.postEditProfile = postEditProfile;
var getChangePassword = function getChangePassword(req, res) {
  var githubLogin = req.session.user.githubLogin;
  console.log(githubLogin);
  if (githubLogin) {
    return res.status(400).redirect("/user/EditMyProfile");
  }
  return res.render("users/ChangePassword", {
    pageTitle: "Edit Password"
  });
};
exports.getChangePassword = getChangePassword;
var postChangePassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$session$user2, _id, password, _req$body4, OldPassword, NewPassword, ConfirmNew, savedUser, correctPassword;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$session$user2 = req.session.user, _id = _req$session$user2._id, password = _req$session$user2.password, _req$body4 = req.body, OldPassword = _req$body4.OldPassword, NewPassword = _req$body4.NewPassword, ConfirmNew = _req$body4.ConfirmNew;
          _context6.prev = 1;
          _context6.next = 4;
          return _Users["default"].findById(_id);
        case 4:
          savedUser = _context6.sent;
          _context6.next = 7;
          return _bcrypt["default"].compare(OldPassword, savedUser.password);
        case 7:
          correctPassword = _context6.sent;
          if (correctPassword) {
            _context6.next = 11;
            break;
          }
          req.flash("error", "Incorrect Password");
          return _context6.abrupt("return", res.render("users/ChangePassword", {
            pageTitle: "Edit Password",
            errors: "The password you entered does not match the previously saved password",
            OldPassword: OldPassword,
            NewPassword: NewPassword,
            ConfirmNew: ConfirmNew
          }));
        case 11:
          if (!(NewPassword !== ConfirmNew)) {
            _context6.next = 14;
            break;
          }
          req.flash("error", "Incorrect Password");
          return _context6.abrupt("return", res.render("users/ChangePassword", {
            pageTitle: "Edit Password",
            errors: "The new password that you entered does not match the password you confirmed",
            OldPassword: OldPassword,
            NewPassword: NewPassword,
            ConfirmNew: ConfirmNew
          }));
        case 14:
          savedUser.password = NewPassword;
          _context6.next = 17;
          return savedUser.save();
        case 17:
          req.session.user.password = savedUser.password;
          req.flash("info", "Password updated");
          return _context6.abrupt("return", res.redirect("/"));
        case 22:
          _context6.prev = 22;
          _context6.t0 = _context6["catch"](1);
          console.log("Password Catch error");
          req.flash("error", "Server Error");
          return _context6.abrupt("return", res.status(400).render("users/ChangePassword", {
            pageTitle: "Edit Password"
          }));
        case 27:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 22]]);
  }));
  return function postChangePassword(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.postChangePassword = postChangePassword;
var logout = function logout(req, res) {
  req.session.destroy();
  res.redirect('/');
};
exports.logout = logout;