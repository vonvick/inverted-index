(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])