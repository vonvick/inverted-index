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
	
	var jsonfile = __webpack_require__(1);
	var jsonfile1 = __webpack_require__(2);
	var emptyJson = __webpack_require__(3);
	
	describe("Inverted Index", function () {
	  var invertedIndex = new InvertedIndex();
	  var books = jsonfile;
	  var books1 = [];
	  var empty = emptyJson;
	
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
	    it("should return false if the file Content is Empty", function () {
	      var createIndex = invertedIndex.createIndex("empty", empty);
	      expect(createIndex).toBe(false);
	    });
	    it("should not create the index again if the file has been uploaded before", function () {
	      var createIndex = invertedIndex.createIndex("books", books);
	      var createIndex2 = invertedIndex.createIndex("books", books);
	      expect(Object.keys(invertedIndex.indexes).length).toBe(1);
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
	    it("should return null for a word not found in the file", function () {
	      var createIndex = invertedIndex.createIndex("books", books);
	      var getIndex = invertedIndex.getIndex("books");
	      var searchIndex = invertedIndex.searchIndex("because");
	      expect(searchIndex[0].books.because).toBe(null);
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
/* 2 */
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = [];

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map