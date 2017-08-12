/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PhotoSystem = function () {
	function PhotoSystem() {
		_classCallCheck(this, PhotoSystem);

		this.searchBtn = $(".btn-search");
		this.events();
	}

	_createClass(PhotoSystem, [{
		key: "events",
		value: function events() {
			this.searchBtn.click(this.getPhotos.bind(this));
		}
	}, {
		key: "getPhotos",
		value: function getPhotos() {
			this.tags = $(".srchtext").val();
			this.pageNum = $(".pages-input").val();

			if (this.searchBtn.hasClass("disabled")) {
				return;
			}
			if (!(this.pageNum.valueOf() > 0 && this.pageNum.valueOf() < 1000)) {
				this.pageNum = '1';
			}
			this.tags = this.tags.match(/\S+/g).join(', ');
			$.ajax({
				url: 'https://api.flickr.com/services/rest/',
				//jsonp: 'jsonp',
				//dataType: 'jsonp',
				data: {
					method: 'flickr.photos.search',
					api_key: '2a546f205c0733cc736e88c9799d9059',
					per_page: '9',
					page: this.pageNum,
					extras: 'url_o',
					tags: this.tags,
					safe_search: '1',
					format: 'json'
				},
				success: function success(response) {
					var res = JSON.parse(response.slice(14, response.length - 1));

					if (res.photos.total > 8) {
						$(".key-image").each(function (cnt) {
							$(this).attr('src', "https://farm" + res.photos.photo[cnt].farm + ".staticflickr.com/" + res.photos.photo[cnt].server + "/" + res.photos.photo[cnt].id + "_" + res.photos.photo[cnt].secret + "_n.jpg");
							$(this).next().text(res.photos.photo[cnt].title);
						});
						$(".res-info").text("");
					} else {
						$(".res-info").text("Sorry, No results found.");
					}
				},
				error: function error(jqXHR, exception) {
					console.log('error: status ' + jqXHR.status + ' response ' + exception);
					$(".res-info").text("Sorry, No results found.");
				}
			});
		}
	}]);

	return PhotoSystem;
}();

//  var quoteSystem = new QuoteSystem();

exports.default = PhotoSystem;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidateSystem = function () {
	function ValidateSystem() {
		_classCallCheck(this, ValidateSystem);

		this.searchTerm = $(".srchtext");
		this.events();
	}

	_createClass(ValidateSystem, [{
		key: "events",
		value: function events() {
			this.searchTerm.keyup(this.valText);
		}
	}, {
		key: "valText",
		value: function valText(theEvent) {
			this.txt = $(".srchtext").val();
			this.srchbtn = $(".btn-search");
			this.check = this.txt.match(/\S+/);

			if (this.check != null && this.check.length > 0) {
				if (this.srchbtn.hasClass("disabled")) {
					this.srchbtn.removeClass("disabled");
				}

				if (theEvent.keyCode == 13) {

					this.srchbtn.trigger("click");
				}
			} else {
				if (!this.srchbtn.hasClass("disabled")) {
					this.srchbtn.addClass("disabled");
				}
			}
		}
	}]);

	return ValidateSystem;
}();

exports.default = ValidateSystem;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _PhotoSystem = __webpack_require__(0);

var _PhotoSystem2 = _interopRequireDefault(_PhotoSystem);

var _ValidateSystem = __webpack_require__(1);

var _ValidateSystem2 = _interopRequireDefault(_ValidateSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var photoSystem = new _PhotoSystem2.default();
var validateSystem = new _ValidateSystem2.default();

/***/ })
/******/ ]);