
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
		this.indexes = [];
	}


	/**
	 * coverts the string provided to lower case, strips the string of all special 
	 * characters, extra spaces and converts the result into an Array
	 * @static 
	 * @param {string} text the text to be converted
	 * @returns {Array} the result that will be returned after function call
	 */
	static textToArray(text) {
		const result = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
		return result;
	}


	/**
	 * loops through an array and removes duplicate elements and returns an indexed 
	 * @static
	 * @param {}
	 * @returns {Array} 
	 */
	_sortIndex(arrayItem, element) {
		element = parseInt(element);
		for(let item in arrayItem) {
			if(!this.indexes.hasOwnProperty([arrayItem[item]])) {
				this.indexes[arrayItem[item]] = [];
				this.indexes[arrayItem[item]].push(element); 
			} else if(this.indexes.hasOwnProperty([arrayItem[item]]) && this.indexes[arrayItem[item]].indexOf(element) === -1) {
				this.indexes[arrayItem[item]].push(element);
			}
		}
	}


	/**
	 * @function takes a file path as argument and read the contents of the file 
	 * @param {string} content the content of the file
	 * @returns {Array} 
	 */
	createIndex(fileContent) {
		const indexArray = [];
		fileContent.forEach((item) => {
			let text = item.title + " " + item.content;
			let textArray = InvertedIndex.textToArray(text);
			indexArray.push(textArray);
		});
		for(let element in indexArray) {
			let textIndex = indexArray[element];
			this._sortIndex(textIndex, element);
		}
		return this.indexes
	}


	/**
	 * @function takes an uploaded file as argument and read the contents of the file 
   * @returns {Object} 
   */
	getIndex(name) {
		if(Object.keys(this.indexes).length < 1 ) {
			return {};
		}
		return this.indexes[name];
	}


	/** 
	 * @function return an object that contains the index of the search
	 * word and the files they can be found. 
	 * @param {string} terms 
	 * @returns {Object}
	 */

	_getTermResult(answer, term) {
		for(let key in this.indexes) {
			if(term in this.indexes[key] && answer[term] === undefined) {
				answer[term] = {};
				answer[term][key] = this.indexes[key][term];
			} else if(term in this.indexes[key] && answer.hasOwnProperty(term)) {
 				answer[term][key] = this.indexes[key][term];
 			}
		}
		return answer;
	}

	/** 
	 * @function takes an array of arguments and returns an array of numbers that represents
	 * the index of the words
	 * @param {string} terms 
	 * @returns {Array}
	 */
	 
	searchIndex(terms) {
	 	terms = InvertedIndex.textToArray(terms);
	 	let result = [];
	 	terms.forEach((term) => {
	 		let fileResult = {};
	 		let answer = this._getTermResult(fileResult, term);
	 		result.push(answer);
	 	});
	 	return result;
	 }
}
