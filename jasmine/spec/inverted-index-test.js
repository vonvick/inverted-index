/* global InvertedIndex */
/* eslint amd:true */
const Utility = require('../../src/js/utility');
const jsonFile = require('../books');
const jsonFile1 = require('../books1');
const emptyJson = require('../empty');
const badJson = require('../bad');
const deepFile = require('../multi-array');

describe('Inverted Index', () => {
  const invertedIndex = new InvertedIndex(Utility);
  const file1 = jsonFile;
  const file2 = jsonFile1;
  const empty = emptyJson;
  const badFile = badJson;

  afterEach(() => {
    invertedIndex.indexes = {};
  });

  it('should be truthy for the instance of the class', () => {
    const indexInstance = invertedIndex;
    expect(invertedIndex instanceof InvertedIndex).toBeTruthy();
  });

  it('should return zero for the length of indexes', () => {
    const indexInstance = invertedIndex;
    expect(Object.keys(invertedIndex.indexes).length).toBe(0);
  });

  describe('Read book data', () => {
    it('should read the content of a json file and return false if the file is empty', () => {
      const book = [];
      const isValid = invertedIndex.utility.readFileData(book);
      expect(isValid).toBe(false);
    });
    it('should read the content of a json file and return true if the file matches the format', () => {
      const isValid = invertedIndex.utility.readFileData(file1);
      expect(isValid).toBe(true);
    });
    it('should return false if the content of the file is not an array of object', () => {
      const isValid = invertedIndex.utility.readFileData(badFile);
      expect(isValid).toBe(false);
    });
    it('should return false if the content of the file is a multi-dimensional array', () => {
      const wrongFile = invertedIndex.utility.readFileData(deepFile);
      expect(wrongFile).toBe(false);
    });
  });

  describe('Populate index', () => {
    beforeEach(() => {
      invertedIndex.createIndex('file1', file1);
    });

    it('should create the index once the file has been read', () => {
      expect(invertedIndex.indexes.file1).toBeDefined();
    });
    it('should return an object of all created index', () => {
      const bookIndex = invertedIndex.indexes.file1;
      const bookKeys = Object.keys(bookIndex);
      bookKeys.forEach((key) => {
        expect({}.hasOwnProperty.call(bookIndex, key)).toBeTruthy();
      });
    });
    it('should return an array that contains the indexes of a word', () => {
      expect(invertedIndex.indexes.file1.and).toEqual([0, 1]);
      expect(invertedIndex.indexes.file1.of).toEqual([0, 1]);
    });
    it('should return false if the file Content is Empty', () => {
      const emptyIndex = invertedIndex.createIndex('empty', empty);
      expect(emptyIndex).toBe(false);
    });
    it('should not create the index again if the file has been uploaded before', () => {
      invertedIndex.createIndex('file1', file1);
      expect(Object.keys(invertedIndex.indexes).length).toBe(1);
    });
  });

  describe('Get Index', () => {
    it('should get the indexes of a particular uploaded file', () => {
      invertedIndex.createIndex('file1', file1);
      const getIndex = invertedIndex.getIndex('file1');
      expect(getIndex).toBeDefined();
    });
    it('should return an empty object for an uploaded file that has not been indexed', () => {
      const getIndex = invertedIndex.getIndex('file1');
      expect(getIndex).toEqual({});
    });
    it('should the length of all indexed file', () => {
      invertedIndex.createIndex('file1', file1);
      invertedIndex.createIndex('file2', file2);
      const getIndex = invertedIndex.getIndex();
      expect(Object.keys(getIndex).length).toBe(2);
    });
    it('should return undefined if no index has been created for a file', () => {
      invertedIndex.createIndex('file1', file1);
      const getIndex = invertedIndex.getIndex('book3');
      expect(getIndex).toBeUndefined();
    });
  });

  describe('Search Index', () => {
    it('should return an array containing the index of a word', () => {
      invertedIndex.createIndex('file1', file1);
      const searchIndex = invertedIndex.searchIndex('file1', 'and');
      expect(searchIndex[0].file1.and).toEqual([0, 1]);
    });
    it('should return null for a word not found in the file', () => {
      invertedIndex.createIndex('file1', file1);
      const searchIndex = invertedIndex.searchIndex('file1', 'because');
      expect(searchIndex[0].file1.because).toBe(null);
    });
    it('should return an array of Objects with keys of all the files searched', () => {
      invertedIndex.createIndex('file1', file1);
      invertedIndex.createIndex('file2', file2);
      const fileList = ['file1', 'file2'];
      const searchIndex = invertedIndex.searchIndex('all', 'and');
      searchIndex.forEach((file) => {
        expect(fileList).toContain(Object.keys(file)[0]);
      });
      expect(Array.isArray(searchIndex)).toBeTruthy();
    });
    it('should return null if a word is not found in a file', () => {
      invertedIndex.createIndex('file1', file1);
      invertedIndex.createIndex('file2', file2);
      const searchIndex = invertedIndex.searchIndex('all', 'because');
      expect(searchIndex[0].file1.because).toBe(null);
      expect(searchIndex[1].file2.because).toBe(null);
    });
    it('should return search results for a number of arguments', () => {
      invertedIndex.createIndex('file1', file1);
      invertedIndex.createIndex('file2', file2);
      const searchIndex = invertedIndex.searchIndex('all', 'because', ['angela', 'Nigeria', 'and'], 'alice');
      expect(searchIndex[0].file1.because).toBe(null);
      expect(searchIndex[1].file2.because).toBe(null);
      expect(searchIndex[0].file1.and).toEqual([0, 1]);
    });
    it('should return an array containing the indexes of the search parameter in the selected file', () => {
      invertedIndex.createIndex('file1', file1);
      invertedIndex.createIndex('file2', file2);
      const searchIndex = invertedIndex.searchIndex('file1', 'and');
      const searchIndex2 = invertedIndex.searchIndex('file2', 'and');
      expect(searchIndex[0].file1.and).toEqual([0, 1]);
      expect(Object.keys(searchIndex[0]).length).toBe(1);
      expect(searchIndex2[0].file2.and).toEqual([0, 1]);
      expect(Object.keys(searchIndex2[0]).length).toBe(1);
    });
  });
});
