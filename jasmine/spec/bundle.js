/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var InvertedIndex = __webpack_require__(1);
	var jsonfile = __webpack_require__(2);
	var jsonfile1 = __webpack_require__(3);
	
	describe("Inverted Index", function () {
	  var invertedIndex = new InvertedIndex();
	  var books = jsonfile;
	  var books1 = [];
	
	  beforeEach(function () {
	    books1 = jsonfile1;
	  });
	
	  afterEach(function () {
	    invertedIndex.indexes = {};
	  });
	
	  it("should return the instance of the class", function () {
	    var indexInstance = invertedIndex;
	    expect(indexInstance).toEqual(jasmine.any(Object));
	    expect(Object.keys(invertedIndex.indexes).length).toBe(0);
	  });
	
	  describe("Read book data", function () {
	    it("should read the content of a json file and return false if the file is empty", function () {
	      var book = [];
	      var readBook = invertedIndex.readBookData(book);
	      expect(readBook).toBe(false);
	    });
	    it("should read the content of a json file and return true if the file is not empty", function () {
	      var book = [];
	      var readBook2 = invertedIndex.readBookData(books);
	      expect(readBook2).toBe(true);
	    });
	  });
	
	  describe("Populate index", function () {
	    it("should create the index once the file has been read", function () {
	      var createIndex = invertedIndex.createIndex("books", books);
	      expect(invertedIndex.indexes.books).toBeDefined();
	    });
	    it("should return an object of all created index", function () {
	      var createIndex = invertedIndex.createIndex("books", books);
	      expect(invertedIndex.indexes.books).toEqual(jasmine.any(Object));
	    });
	    it("should return an array of a particular word showing indexes", function () {
	      var createIndex = invertedIndex.createIndex("books", books);
	      expect(invertedIndex.indexes.books.and).toEqual([0, 1]);
	      expect(invertedIndex.indexes.books.of).toEqual([0, 1]);
	    });
	  });
	
	  describe("Get Index", function () {
	    it("should get the indexes of a particular uploaded file", function () {
	      var createIndex = invertedIndex.createIndex("books", books);
	      var getIndex = invertedIndex.getIndex("books");
	      expect(getIndex).toBeDefined();
	    });
	    it("should return an empty object for an uploaded file that has not been indexed", function () {
	      var getIndex = invertedIndex.getIndex("books");
	      expect(getIndex).toEqual({});
	    });
	    it("should get all the indexes of all uploaded file", function () {
	      var createIndex = invertedIndex.createIndex("books", books);
	      var createIndex2 = invertedIndex.createIndex("books1", books1);
	      var getIndex = invertedIndex.getIndex();
	      expect(Object.keys(getIndex).length).toBe(2);
	    });
	    it("should return an empty object if no indexes has been created", function () {
	      var createIndex = invertedIndex.createIndex("books", books);
	      var createIndex2 = invertedIndex.createIndex("books1", books1);
	      var getIndex = invertedIndex.getIndex();
	      expect(Object.keys(getIndex).length).toBe(2);
	    });
	  });
	
	  describe("Search Index", function () {
	    it("should return an array of the index of the words in the file and the word", function () {
	      var createIndex = invertedIndex.createIndex("books", books);
	      var getIndex = invertedIndex.getIndex("books");
	      var searchIndex = invertedIndex.searchIndex("and");
	      expect(searchIndex[0].books.and).toEqual([0, 1]);
	    });
	    it("should return an array of Objects containing the search parameter, the files and their indexes", function () {
	      var createIndex = invertedIndex.createIndex("books", books);
	      var createIndex2 = invertedIndex.createIndex("books1", books1);
	      var getIndex = invertedIndex.getIndex();
	      var searchIndex = invertedIndex.searchIndex("and");
	      expect(searchIndex[0].books.and).toEqual([0, 1]);
	      expect(searchIndex[1].books1.and).toEqual([0, 1]);
	    });
	    it("should return an array of Objects containing the search parameter in the selected file and its indexes", function () {
	      var createIndex = invertedIndex.createIndex("books", books);
	      var createIndex2 = invertedIndex.createIndex("books1", books1);
	      var getIndex = invertedIndex.getIndex();
	      var searchIndex = invertedIndex.searchIndex("and", "books");
	      var searchIndex2 = invertedIndex.searchIndex("and", "books1");
	      expect(searchIndex[0].books.and).toEqual([0, 1]);
	      expect(Object.keys(searchIndex[0]).length).toBe(1);
	      expect(searchIndex2[0].books1.and).toEqual([0, 1]);
	      expect(Object.keys(searchIndex2[0]).length).toBe(1);
	    });
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  InvertedIndex class constructor
	 *  @class
	 */
	
	var InvertedIndex = function () {
	  /**
	   *  class constructor
	   *  @constructor
	   */
	  function InvertedIndex() {
	    _classCallCheck(this, InvertedIndex);
	
	    this.indexes = {};
	  }
	
	  /**
	   * converts the string provided to lower case, strips the string of all 
	   * special characters, extra spaces and converts the result into an Array
	   * @static 
	   * @param {string} text the text to be converted
	   * @returns {Array} the result that will be returned after function call
	   */
	
	
	  _createClass(InvertedIndex, [{
	    key: "_sortIndex",
	
	
	    /**
	     * loops through an array and removes duplicate elements
	     * @static
	     * @param {}
	     * @returns {Array} 
	     */
	    value: function _sortIndex(bookName, arrayItem, element) {
	      element = parseInt(element);
	      for (var item in arrayItem) {
	        if (!this.indexes[bookName].hasOwnProperty([arrayItem[item]])) {
	          this.indexes[bookName][arrayItem[item]] = [];
	          this.indexes[bookName][arrayItem[item]].push(element);
	        } else if (this.indexes[bookName].hasOwnProperty([arrayItem[item]]) && this.indexes[bookName][arrayItem[item]].indexOf(element) === -1) {
	          this.indexes[bookName][arrayItem[item]].push(element);
	        }
	      }
	    }
	
	    /**
	     * reads the content of a json file and returns false if the file is empty or 
	     * returns true if there are documents in the file.
	     * 
	     */
	
	  }, {
	    key: "readBookData",
	    value: function readBookData(book) {
	      if (book.length < 1) {
	        return false;
	      } else {
	        return true;
	      }
	    }
	
	    /**
	     * @function takes a file path as argument and read the contents of the file 
	     * @param {string} name the name of the file
	     * @param {Array} content the content of the file
	     * @returns {Array} 
	     */
	
	  }, {
	    key: "createIndex",
	    value: function createIndex(name, fileContent) {
	      if (!this.readBookData) {
	        return false;
	      }
	      var indexArray = [];
	      fileContent.forEach(function (item) {
	        var text = item.title + " " + item.text;
	        var textArray = InvertedIndex.textToArray(text);
	        indexArray.push(textArray);
	      });
	
	      if (!this.indexes[name]) {
	        this.indexes[name] = {};
	        for (var element in indexArray) {
	          var textIndex = indexArray[element];
	          this._sortIndex(name, textIndex, element);
	        }
	      }
	    }
	
	    /**
	     * @function takes an uploaded file as argument and read the contents of the
	     * file 
	     * @returns {Object} 
	     */
	
	  }, {
	    key: "getIndex",
	    value: function getIndex() {
	      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
	      if (Object.keys(this.indexes).length < 1) {
	        return {};
	      } else if (name === null) {
	        return this.indexes;
	      } else {
	        if (this.indexes[name]) {
	          return this.indexes[name];
	        }
	      }
	    }
	
	    /** 
	     * @function return an object that contains the index of the search
	     * word and the files they can be found. 
	     * @param {string} terms 
	     * @returns {Object}
	     */
	
	  }, {
	    key: "_getTermResult",
	    value: function _getTermResult(searchFile, terms) {
	      var result = [];
	      var indexTerm = Object.keys(searchFile);
	      indexTerm.forEach(function (file) {
	        var files = {};
	        files[file] = {};
	        terms.forEach(function (term) {
	          if (searchFile[file].hasOwnProperty(term)) {
	            files[file][term] = {};
	            files[file][term] = searchFile[file][term];
	          }
	        });
	        result.push(files);
	      });
	      return result;
	    }
	
	    /** 
	     * @function takes an array of arguments and returns an array of numbers that 
	     * represents the index of the words
	     * @param {string} terms 
	     * @returns {Array}
	     */
	
	  }, {
	    key: "searchIndex",
	    value: function searchIndex(terms) {
	      var _this = this;
	
	      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	      if (name && !this.indexes.hasOwnProperty(name)) {
	        return "No such File";
	      }
	      terms = InvertedIndex.textToArray(terms);
	      var result = [];
	      if (name === null) {
	        var searchFile = this.indexes;
	        result = this._getTermResult(searchFile, terms);
	        return result;
	      } else {
	        var _ret = function () {
	          var searchFile = _this.indexes[name];
	          var file = {};
	          file[name] = {};
	          terms.forEach(function (term) {
	            if (term in searchFile) {
	              file[name][term] = searchFile[term];
	            }
	          });
	          result.push(file);
	          return {
	            v: result
	          };
	        }();
	
	        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	      }
	    }
	  }], [{
	    key: "textToArray",
	    value: function textToArray(text) {
	      var result = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/);
	      return result;
	    }
	  }]);
	
	  return InvertedIndex;
	}();
	
	module.exports = InvertedIndex;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = [
		{
			"title": "Alice in Wonderland",
			"text": "Alice falls into a rabbit hole and enters a world full of imagination."
		},
		{
			"title": "The Lord of the Rings: The Fellowship of the Ring.",
			"text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
		}
	];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = [
		{
			"title": "Harry Porter and the prisoner of azkaban",
			"text": "Harry porter tries to eat rice and beans in the prisoner of azkaban."
		},
		{
			"title": "The wizard of OZ.",
			"text": "A wizard comes to town with a powerful ring and falls into a rabbit hole."
		}
	];

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map