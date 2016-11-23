/**
 *  InvertedIndex class constructor
 *  @class
 */

class InvertedIndex {
  /**
   *  class constructor
   *  @constructor
   */
  constructor() {
    this.indexes = {};
  }


  /**
   * converts the string provided to lower case, strips the string of all 
   * special characters, extra spaces and converts the result into an Array
   * @static 
   * @param {string} text the text to be converted
   * @returns {Array} the result that will be returned after function call
   */
  static textToArray(text) {
    const result = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/);
    return result;
  }


  /**
   * loops through an array and removes duplicate elements
   * @static
   * @param {}
   * @returns {Array} 
   */
  _sortIndex(bookName, arrayItem, element) {
    element = parseInt(element);
    for(let item in arrayItem) {
      if(!this.indexes[bookName].hasOwnProperty([arrayItem[item]])) {
        this.indexes[bookName][arrayItem[item]] = [];
        this.indexes[bookName][arrayItem[item]].push(element); 
      } else if(
        this.indexes[bookName].hasOwnProperty([arrayItem[item]]) && 
        this.indexes[bookName][arrayItem[item]].indexOf(element) === -1) {
        this.indexes[bookName][arrayItem[item]].push(element);
      }
    }
  }

  /**
   * reads the content of a json file and returns false if the file is empty or 
   * returns true if there are documents in the file.
   * 
   */
  readBookData(book) {
    if(book.length < 1) {
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
  createIndex(name, fileContent) {
    if(!this.readBookData) {
      return false;
    } 
    const indexArray = [];
    fileContent.forEach((item) => {
      let text = item.title + " " + item.text;
      let textArray = InvertedIndex.textToArray(text);
      indexArray.push(textArray);
    });
    
    if(!this.indexes[name]) {
      this.indexes[name] = {};
      for(let element in indexArray) {
        let textIndex = indexArray[element];
        this._sortIndex(name, textIndex, element);
      }
    }
  }


  /**
   * @function takes an uploaded file as argument and read the contents of the
   * file 
   * @returns {Object} 
   */
  getIndex(name = null) {
    if(Object.keys(this.indexes).length < 1 ) {
      return {};
    } else if(name === null) {
      return this.indexes;
    } else {
      if(this.indexes[name]) {
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

  _getTermResult(searchFile, terms) {
    let result = [];
    let indexTerm = Object.keys(searchFile);
      indexTerm.forEach((file) => {
        let files = {};
        files[file] = {};
        terms.forEach((term) => {
          if(searchFile[file].hasOwnProperty(term)) {
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
   
  searchIndex(terms, name = null) {
    if (name && !this.indexes.hasOwnProperty(name)) {
      return "No such File";
    }
    terms = InvertedIndex.textToArray(terms);
    let result = [];
    if(name === null) {
      let searchFile = this.indexes;
      result = this._getTermResult(searchFile, terms);
      return result;
    } else {
      let searchFile = this.indexes[name];
      let file = {};
      file[name] = {};
      terms.forEach((term) => {
        if(term in searchFile) {
          file[name][term] = searchFile[term];
        }
      });
      result.push(file);
      return result;
    }
  }
}

module.exports = InvertedIndex;