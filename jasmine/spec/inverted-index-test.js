var jsonfile = require("../books");
var jsonfile1 = require("../books1");
var emptyJson = require("../empty")

describe("Inverted Index", () => {
  const invertedIndex = new InvertedIndex();
  let books = jsonfile;
  let books1 = [];
  let empty = emptyJson;

  beforeEach(() => {
    books1 = jsonfile1;
  });

  afterEach(() => {
    invertedIndex.indexes = {};
  });
  
  it("should return the instance of the class", () => {
    let indexInstance = invertedIndex;
    expect(indexInstance).toEqual(jasmine.any(Object));
    expect(Object.keys(invertedIndex.indexes).length).toBe(0);
  });

  describe("Read book data", () => {
    it("should read the content of a json file and return false if the file is empty", () => {
      let book = [];
      let readBook = invertedIndex.readBookData(book);
      expect(readBook).toBe(false);
    });
    it("should read the content of a json file and return true if the file is not empty", () => {
      let book = [];
      let readBook2 = invertedIndex.readBookData(books);
      expect(readBook2).toBe(true);
    });
  });

  describe("Populate index", () => {
    it("should create the index once the file has been read", () => {
      let createIndex = invertedIndex.createIndex("books", books);
      expect(invertedIndex.indexes.books).toBeDefined();
    });
    it("should return an object of all created index", () => {
      let createIndex = invertedIndex.createIndex("books", books);
      expect(invertedIndex.indexes.books).toEqual(jasmine.any(Object));
    });
    it("should return an array of a particular word showing indexes", () => {
      let createIndex = invertedIndex.createIndex("books", books);
      expect(invertedIndex.indexes.books.and).toEqual([0,1]);
      expect(invertedIndex.indexes.books.of).toEqual([0,1]);
    });
    it("should return false if the file Content is Empty", () => {
      let createIndex = invertedIndex.createIndex("empty", empty);
      expect(createIndex).toBe(false);
    });
    it("should not create the index again if the file has been uploaded before", () => {
      let createIndex = invertedIndex.createIndex("books", books);
      let createIndex2 = invertedIndex.createIndex("books", books);
      expect(Object.keys(invertedIndex.indexes).length).toBe(1);
    });
  });

  describe("Get Index", () => {
    it("should get the indexes of a particular uploaded file", () => {
      let createIndex = invertedIndex.createIndex("books", books);
      let getIndex = invertedIndex.getIndex("books");
      expect(getIndex).toBeDefined();
    });
    it("should return an empty object for an uploaded file that has not been indexed", () => {
      let getIndex = invertedIndex.getIndex("books");
      expect(getIndex).toEqual({});
    });
    it("should get all the indexes of all uploaded file", () => {
      let createIndex = invertedIndex.createIndex("books", books);
      let createIndex2 = invertedIndex.createIndex("books1", books1);
      let getIndex = invertedIndex.getIndex();
      expect(Object.keys(getIndex).length).toBe(2);
    });
    it("should return an empty object if no indexes has been created", () => {
      let createIndex = invertedIndex.createIndex("books", books);
      let createIndex2 = invertedIndex.createIndex("books1", books1);
      let getIndex = invertedIndex.getIndex();
      expect(Object.keys(getIndex).length).toBe(2);
    });
  });

  describe("Search Index", () => {
    it("should return an array of the index of the words in the file and the word", () => {
      let createIndex = invertedIndex.createIndex("books", books);
      let getIndex = invertedIndex.getIndex("books");
      let searchIndex = invertedIndex.searchIndex("and");
      expect(searchIndex[0].books.and).toEqual([0,1]);
    });
    it("should return null for a word not found in the file", () => {
      let createIndex = invertedIndex.createIndex("books", books);
      let getIndex = invertedIndex.getIndex("books");
      let searchIndex = invertedIndex.searchIndex("because");
      expect(searchIndex[0].books.because).toBe(null);
    });
    it("should return an array of Objects containing the search parameter, the files and their indexes", () => {
      let createIndex = invertedIndex.createIndex("books", books);
      let createIndex2 = invertedIndex.createIndex("books1", books1);
      let getIndex = invertedIndex.getIndex();
      let searchIndex = invertedIndex.searchIndex("and");
      expect(searchIndex[0].books.and).toEqual([0,1]);
      expect(searchIndex[1].books1.and).toEqual([0,1]);
    });
    it("should return an array of Objects containing the search parameter in the selected file and its indexes", () => {
      let createIndex = invertedIndex.createIndex("books", books);
      let createIndex2 = invertedIndex.createIndex("books1", books1);
      let getIndex = invertedIndex.getIndex();
      let searchIndex = invertedIndex.searchIndex("and", "books");
      let searchIndex2 = invertedIndex.searchIndex("and", "books1");
      expect(searchIndex[0].books.and).toEqual([0,1]);
      expect(Object.keys(searchIndex[0]).length).toBe(1);
      expect(searchIndex2[0].books1.and).toEqual([0,1]);
      expect(Object.keys(searchIndex2[0]).length).toBe(1);
    });
  });
});