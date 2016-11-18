
describe("Inverted Index", () => {
  const invertedIndex = new InvertedIndex();
  let books = [];
  let books1 = [];

  beforeEach(() => {
    books = [
      {
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
      },

      {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
      },

      {
        "title": "I love to sing",
        "text": "I love to sing and dance and everytime I do that I feel happy and loved"
      }
    ];

    books1 = [
      {
        "title": "Harry Porter and the prisoner of azkaban",
        "text": "Harry porter tries to eat rice and beans in the prisoner of azkaban."
      },

      {
        "title": "The wizard of OZ.",
        "text": "A wizard comes to town with a powerful ring and falls into a rabbit hole."
      }
    ];
  })

  afterEach(() => {
    invertedIndex.indexes = {};
  })
  
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
      expect(invertedIndex.indexes.books.and).toEqual([0,1,2]);
      expect(invertedIndex.indexes.books.of).toEqual([0,1]);
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
});