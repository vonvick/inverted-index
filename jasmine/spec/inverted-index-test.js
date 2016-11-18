
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
});