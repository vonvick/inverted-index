/* eslint class-methods-use-this: "off" */

/**
 *  Utility class constructor
 *  @class
 */

class Utility {

  /**
   * converts the string provided to lower case, strips the string of all
   * special characters, extra spaces and converts the result into an Array
   * @param {string} text the text to be converted
   * @returns {Array} the result that will be returned after function call
   */
  static textToArray(text) {
    const result = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    return result;
  }

  /**
   * checks the content of the uploaded json file and returns
   * true if the file follows the allowed format
   * @param {Array} file the content of the file
   * @returns {boolean} returns a boolean
   */
  static readFileData(file) {
    if (!Array.isArray(file) || file.length < 1) {
      return false;
    }
    for (let i = 0; i < file.length; i += 1) {
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
  static tokenizeFile(file) {
    const fileContent = [];
    for (let i = 0; i < file.length; i += 1) {
      if (file[i].title && file[i].text) {
        const text = `${file[i].title} ${file[i].text}`;
        const fileDoc = this.textToArray(text);
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
  static searchAFile(file, terms, name) {
    const files = {};
    files[name] = {};
    for (let j = 0; j < terms.length; j += 1) {
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
  static searchAllFiles(searchFiles, terms) {
    const result = [];
    let file = {};
    let fileResult = {};
    const fileNames = Object.keys(searchFiles);
    for (let i = 0; i < fileNames.length; i += 1) {
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
  static sortSearchTerms(searchTerms) {
    let searchTerm = [];
    for (let i = 0; i < searchTerms.length; i += 1) {
      if (Array.isArray(searchTerms[i])) {
        searchTerm = searchTerm.concat(searchTerms[i]);
      } else {
        searchTerm.push(searchTerms[i]);
      }
    }
    searchTerm = searchTerm.join(' ');
    const terms = this.textToArray(searchTerm);
    return terms;
  }
}

module.exports = Utility;
