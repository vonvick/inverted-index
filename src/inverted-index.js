
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
	 * @function takes a file path as argument and read the contents of the file 
	 * @param {string} content the content of the file
	 * @returns {Array} 
	 */
	createIndex(filepath) {
		const indexArray = [];
		fileContent.forEach((item) => {
			let text = item.title + " " + item.content;
			let textArray = InvertedIndex.textToArray(text);
			indexArray.push(textArray);
		});
		
		if(!this.indexes[name]) {
			this.indexes[name] = {};
			for(let element in indexArray) {
				for(let item in indexArray[element]) {
					// this.indexes[name][indexArray[element][item]] = [];
					if(this.indexes[name][indexArray[element][item]] === undefined) {
						this.indexes[name][indexArray[element][item]] = element; 
					} else if(this.indexes[name].hasOwnProperty([indexArray[element][item]]) && 
					this.indexes[name][indexArray[element][item]].search(element) === -1) {
						this.indexes[name][indexArray[element][item]] += element;
					} 
				}
			}
		}
	}
}

var index = new InvertedIndex();
index.createIndex()