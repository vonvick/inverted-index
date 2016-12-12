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

	'use strict';
	
	/* global InvertedIndex */
	var Utility = __webpack_require__(1);
	var jsonFile = __webpack_require__(2);
	var jsonFile1 = __webpack_require__(3);
	var emptyJson = __webpack_require__(4);
	var badJson = __webpack_require__(5);
	var deepFile = __webpack_require__(6);
	
	describe('Inverted Index', function () {
	  var invertedIndex = new InvertedIndex(Utility);
	  var file1 = jsonFile;
	  var file2 = jsonFile1;
	  var empty = emptyJson;
	  var badFile = badJson;
	
	  afterEach(function () {
	    invertedIndex.indexes = {};
	  });
	
	  it('should be truthy for the instance of the class', function () {
	    var indexInstance = invertedIndex;
	    expect(invertedIndex instanceof InvertedIndex).toBeTruthy();
	  });
	
	  it('should return zero for the length of indexes', function () {
	    var indexInstance = invertedIndex;
	    expect(Object.keys(invertedIndex.indexes).length).toBe(0);
	  });
	
	  describe('Read book data', function () {
	    it('should read the content of a json file and return false if the file is empty', function () {
	      var book = [];
	      var isValid = invertedIndex.utility.readFileData(book);
	      expect(isValid).toBe(false);
	    });
	    it('should read the content of a json file and return true if the file matches the format', function () {
	      var isValid = invertedIndex.utility.readFileData(file1);
	      expect(isValid).toBe(true);
	    });
	    it('should return false if the content of the file is not an array of object', function () {
	      var isValid = invertedIndex.utility.readFileData(badFile);
	      expect(isValid).toBe(false);
	    });
	    it('should return false if the content of the file is a multi-dimensional array', function () {
	      var wrongFile = invertedIndex.utility.readFileData(deepFile);
	      expect(wrongFile).toBe(false);
	    });
	  });
	
	  describe('Populate index', function () {
	    beforeEach(function () {
	      invertedIndex.createIndex('file1', file1);
	    });
	
	    it('should create the index once the file has been read', function () {
	      expect(invertedIndex.indexes.file1).toBeDefined();
	    });
	    it('should return an object of all created index', function () {
	      var bookIndex = invertedIndex.indexes.file1;
	      var bookKeys = Object.keys(bookIndex);
	      bookKeys.forEach(function (key) {
	        expect({}.hasOwnProperty.call(bookIndex, key)).toBeTruthy();
	      });
	    });
	    it('should return an array that contains the indexes of a word', function () {
	      expect(invertedIndex.indexes.file1.and).toEqual([0, 1]);
	      expect(invertedIndex.indexes.file1.of).toEqual([0, 1]);
	    });
	    it('should return false if the file Content is Empty', function () {
	      var emptyIndex = invertedIndex.createIndex('empty', empty);
	      expect(emptyIndex).toBe(false);
	    });
	    it('should not create the index again if the file has been uploaded before', function () {
	      invertedIndex.createIndex('file1', file1);
	      expect(Object.keys(invertedIndex.indexes).length).toBe(1);
	    });
	  });
	
	  describe('Get Index', function () {
	    it('should get the indexes of a particular uploaded file', function () {
	      invertedIndex.createIndex('file1', file1);
	      var getIndex = invertedIndex.getIndex('file1');
	      expect(getIndex).toBeDefined();
	    });
	    it('should return an empty object for an uploaded file that has not been indexed', function () {
	      var getIndex = invertedIndex.getIndex('file1');
	      expect(getIndex).toEqual({});
	    });
	    it('should the length of all indexed file', function () {
	      invertedIndex.createIndex('file1', file1);
	      invertedIndex.createIndex('file2', file2);
	      var getIndex = invertedIndex.getIndex();
	      expect(Object.keys(getIndex).length).toBe(2);
	    });
	    it('should return undefined if no index has been created for a file', function () {
	      invertedIndex.createIndex('file1', file1);
	      var getIndex = invertedIndex.getIndex('book3');
	      expect(getIndex).toBeUndefined();
	    });
	  });
	
	  describe('Search Index', function () {
	    it('should return an array containing the index of a word', function () {
	      invertedIndex.createIndex('file1', file1);
	      var searchIndex = invertedIndex.searchIndex('file1', 'and');
	      expect(searchIndex[0].file1.and).toEqual([0, 1]);
	    });
	    it('should return null for a word not found in the file', function () {
	      invertedIndex.createIndex('file1', file1);
	      var searchIndex = invertedIndex.searchIndex('file1', 'because');
	      expect(searchIndex[0].file1.because).toBe(null);
	    });
	    it('should return an array of Objects with keys of all the files searched', function () {
	      invertedIndex.createIndex('file1', file1);
	      invertedIndex.createIndex('file2', file2);
	      var fileList = ['file1', 'file2'];
	      var searchIndex = invertedIndex.searchIndex('all', 'and');
	      searchIndex.forEach(function (file) {
	        expect(fileList).toContain(Object.keys(file)[0]);
	      });
	      expect(Array.isArray(searchIndex)).toBeTruthy();
	    });
	    it('should return null if a word is not found in a file', function () {
	      invertedIndex.createIndex('file1', file1);
	      invertedIndex.createIndex('file2', file2);
	      var searchIndex = invertedIndex.searchIndex('all', 'because');
	      expect(searchIndex[0].file1.because).toBe(null);
	      expect(searchIndex[1].file2.because).toBe(null);
	    });
	    it('should return search results for a number of arguments', function () {
	      invertedIndex.createIndex('file1', file1);
	      invertedIndex.createIndex('file2', file2);
	      var searchIndex = invertedIndex.searchIndex('all', 'because', ['angela', 'Nigeria', 'and'], 'alice');
	      expect(searchIndex[0].file1.because).toBe(null);
	      expect(searchIndex[1].file2.because).toBe(null);
	      expect(searchIndex[0].file1.and).toEqual([0, 1]);
	    });
	    it('should return an array containing the indexes of the search parameter in the selected file', function () {
	      invertedIndex.createIndex('file1', file1);
	      invertedIndex.createIndex('file2', file2);
	      var searchIndex = invertedIndex.searchIndex('file1', 'and');
	      var searchIndex2 = invertedIndex.searchIndex('file2', 'and');
	      expect(searchIndex[0].file1.and).toEqual([0, 1]);
	      expect(Object.keys(searchIndex[0]).length).toBe(1);
	      expect(searchIndex2[0].file2.and).toEqual([0, 1]);
	      expect(Object.keys(searchIndex2[0]).length).toBe(1);
	    });
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* eslint class-methods-use-this: "off" */
	
	/**
	 *  Utility class constructor
	 *  @class
	 */
	
	var Utility = function () {
	  function Utility() {
	    _classCallCheck(this, Utility);
	  }
	
	  _createClass(Utility, null, [{
	    key: 'textToArray',
	
	
	    /**
	     * converts the string provided to lower case, strips the string of all
	     * special characters, extra spaces and converts the result into an Array
	     * @param {string} text the text to be converted
	     * @returns {Array} the result that will be returned after function call
	     */
	    value: function textToArray(text) {
	      var result = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
	      return result;
	    }
	
	    /**
	     * checks the content of the uploaded json file and returns
	     * true if the file follows the allowed format
	     * @param {Array} file the content of the file
	     * @returns {boolean} returns a boolean
	     */
	
	  }, {
	    key: 'readFileData',
	    value: function readFileData(file) {
	      if (!Array.isArray(file) || file.length < 1) {
	        return false;
	      }
	      for (var i = 0; i < file.length; i += 1) {
	        if (!file[i].title || !file[i].text) {
	          return false;
	        }
	      }
	      return true;
	    }
	
	    /**
	     * check the documents in the uploaded file and returns
	     * the content of the file in a tokenized format
	     * @param {Array} file the content of the file
	     * @returns {Array} returns array
	     */
	
	  }, {
	    key: 'tokenizeFile',
	    value: function tokenizeFile(file) {
	      var fileContent = [];
	      for (var i = 0; i < file.length; i += 1) {
	        if (file[i].title && file[i].text) {
	          var text = file[i].title + ' ' + file[i].text;
	          var fileDoc = this.textToArray(text);
	          fileContent.push(fileDoc);
	        }
	      }
	      return fileContent;
	    }
	
	    /**
	     * @function searches for the given word(s) in a given file
	     * @param {Object} file an Object with token as keys and array of index as values
	     * @param {Array} terms an Array of word(s) to be searched for
	     * @returns {Object}
	     */
	
	  }, {
	    key: 'searchAFile',
	    value: function searchAFile(file, terms, name) {
	      var files = {};
	      files[name] = {};
	      for (var j = 0; j < terms.length; j += 1) {
	        if (file[terms[j]]) {
	          files[name][terms[j]] = file[terms[j]];
	        } else {
	          files[name][terms[j]] = null;
	        }
	      }
	      return files;
	    }
	
	    /**
	     * @function return an object that contains the index of the search
	     * word and the files they can be found.
	     * @param {Object} searchFile the objects of Object
	     * @param {Array} terms an Array of word(s) to be searched for
	     * @returns {Array}
	     */
	
	  }, {
	    key: 'searchAllFiles',
	    value: function searchAllFiles(searchFiles, terms) {
	      var result = [];
	      var file = {};
	      var fileResult = {};
	      var fileNames = Object.keys(searchFiles);
	      for (var i = 0; i < fileNames.length; i += 1) {
	        file = searchFiles[fileNames[i]];
	        fileResult = this.searchAFile(file, terms, fileNames[i]);
	        result.push(fileResult);
	      }
	      return result;
	    }
	
	    /**
	     * @function takes an array and returns a sanitized version of the array
	     * @param {string} terms
	     * @returns {Array}
	     */
	
	  }, {
	    key: 'sortSearchTerms',
	    value: function sortSearchTerms(searchTerms) {
	      var searchTerm = [];
	      for (var i = 0; i < searchTerms.length; i += 1) {
	        if (Array.isArray(searchTerms[i])) {
	          searchTerm = searchTerm.concat(searchTerms[i]);
	        } else {
	          searchTerm.push(searchTerms[i]);
	        }
	      }
	      searchTerm = searchTerm.join(' ');
	      var terms = this.textToArray(searchTerm);
	      return terms;
	    }
	  }]);
	
	  return Utility;
	}();
	
	module.exports = Utility;

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

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = [];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {
		"file1": {
			"title": "Alice in Wonderland",
			"text": "Alice falls into a rabbit hole and enters a world full of imagination."
		},
		"file2": {
			"title": "The Lord of the Rings: The Fellowship of the Ring.",
			"text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
		}
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = [
		[
			{
				"file1": {
					"title": "Alice in Wonderland",
					"text": "Alice falls into a rabbit hole and enters a world full of imagination."
				}
			}
		],
		[
			{
				"file2": {
					"title": "The Lord of the Rings: The Fellowship of the Ring.",
					"text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
				}
			}
		]
	];

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map