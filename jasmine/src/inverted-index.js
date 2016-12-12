/* eslint class-methods-use-this: "off" */

/**
 *  InvertedIndex class constructor
 *  @class
 */

class InvertedIndex {
  /**
   *  class constructor
   *  @constructor
   */
  constructor(utility) {
    this.utility = utility;
    this.indexes = {};
  }

  /**
   * loops through an array and removes duplicate elements
   * @param {string} bookName the name of the file to index
   * @param {Array} items the array to loop through
   * @param {number} element the index of the word of the Array
   * @returns {Array}
   */
  sortDocument(bookName, items, element) {
    element = parseInt(element, 10);
    for (let item = 0; item < items.length; item += 1) {
      if (!this.indexes[bookName][items[item]]) {
        this.indexes[bookName][items[item]] = [];
        this.indexes[bookName][items[item]].push(element);
      } else if (
        this.indexes[bookName][items[item]] &&
        !this.indexes[bookName][items[item]].includes(element)) {
        this.indexes[bookName][items[item]].push(element);
      }
    }
  }

  /**
   * @function takes a file path as argument and read the contents of the file
   * @param {string} name the name of the file
   * @param {array} content the content of the file
   * @returns {object}
   */
  createIndex(name, fileContent) {
    const readFile = this.utility.readFileData(fileContent);
    if (!readFile) {
      return false;
    }
    if (!this.indexes[name]) {
      const tokenize = this.utility.tokenizeFile(fileContent);
      this.indexes[name] = {};
      for (let i = 0; i < tokenize.length; i += 1) {
        const textIndex = tokenize[i];
        this.sortDocument(name, textIndex, i);
      }
    } else {
      return 'You have uploaded this file before';
    }
  }

  /**
   * @function takes an indexed file as argument and return the indexes of the
   * file
   * @param {string} name the name of the file to get the index for
   * @returns {Object}
   */
  getIndex(name) {
    name = name || null;
    if (Object.keys(this.indexes).length < 1) {
      return {};
    } else if (name === null) {
      return this.indexes;
    }
    return this.indexes[name];
  }

  /**
   * @function takes an array of arguments and returns an array of numbers that
   * represents the index of the words
   * @param {string} terms
   * @returns {Array}
   */
  searchIndex(name, ...searchTerms) {
    const terms = this.utility.sortSearchTerms(searchTerms);
    name = name || 'all';
    let result = [];
    if (name === 'all') {
      const searchFiles = this.indexes;
      result = this.utility.searchAllFiles(searchFiles, terms);
      return result;
    }
    const searchFile = this.indexes[name];
    const file = this.utility.searchAFile(searchFile, terms, name);
    result.push(file);
    return result;
  }
}
