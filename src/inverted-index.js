
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
	sortIndex(arrayItem, element) {
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
			this.sortIndex(textIndex, element);
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
}
