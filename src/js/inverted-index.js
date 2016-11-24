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
   * @param {Array} book the content of the book
   * @returns {boolean} returns a boolean
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
   * @param {array} content the content of the file
   * @returns {object} 
   */
  createIndex(name, fileContent) {
    if(!this.readBookData(fileContent)) {
      return false;
    } 
    const indexArray = [];
    for(let i = 0; i < fileContent.length; i++) {
      if(fileContent[i].title && fileContent[i].text) {
        let text = `${fileContent[i].title} ${fileContent[i].text}`;
        let textArray = InvertedIndex.textToArray(text);
        indexArray.push(textArray);
      }
    }
  
    if(!this.indexes[name] && indexArray.length > 0) {
      this.indexes[name] = {};
      for(let element in indexArray) {
        let textIndex = indexArray[element];
        this._sortIndex(name, textIndex, element);
      }
    } else {
      return "You have uploaded this file before";
    }
  }


  /**
   * @function takes an uploaded file as argument and read the contents of the
   * file 
   * @param {string} name the name of the file to get the index for
   * @returns {object} 
   */
  getIndex(name) {
    name = name || null;
    if(Object.keys(this.indexes).length < 1 ) {
      return {};
    } else if(name === null) {
      return this.indexes;
    } else {
      return this.indexes[name];
    }
  }


  /** 
   * @function return an object that contains the index of the search
   * word and the files they can be found. 
   * @param {string} terms 
   * @returns {object}
   */

  _getTermResult(searchFile, terms) {
    const result = [];
    for(let key in searchFile) {
      const files = {};
      files[key] = {};
        for(let j = 0; j < terms.length; j++){
          if(searchFile[key].hasOwnProperty(terms[j])) {
            files[key][terms[j]] = searchFile[key][terms[j]];
          } else {
            files[key][terms[j]] = null;
          }
        }
      result.push(files);
    }
    return result;
  }


  /** 
   * @function takes an array of arguments and returns an array of numbers that 
   * represents the index of the words
   * @param {string} terms 
   * @returns {array}
   */
   
  searchIndex(terms, name) {
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
      for(let i = 0; i < terms.length; i++) {
        if(terms[i] in searchFile) {
          file[name][terms[i]] = searchFile[terms[i]];
        } else {
          file[name][terms[i]] = null;
        }
      }
      result.push(file);
      return result;
    }
  }
}