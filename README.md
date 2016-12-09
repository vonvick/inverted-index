[![Build Status](https://travis-ci.org/andela-vnwaiwu/inverted-index.svg?branch=develop)](https://travis-ci.org/andela-vnwaiwu/inverted-index) [![Coverage Status](https://coveralls.io/repos/github/andela-vnwaiwu/inverted-index/badge.svg?branch=develop)](https://coveralls.io/github/andela-vnwaiwu/inverted-index?branch=develop) [![Code Climate](https://codeclimate.com/github/andela-vnwaiwu/inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-vnwaiwu/inverted-index)

# Inverted Index

The Inverted index application allows a user to search for text blocks in the array that contain a specified collection of words.
The user can upload multiple JSON files with the correct format displayed below and create an indexes for them, search for words in
all files and one file.

The link to the hosted application on heroku can be found [here](https://inverted-index-andela.herokuapp.com)

#### How can I get started with the api?
1. To use the application locally, clone the repository and run ``` npm install ```. It will download all dependencies.
2. Run ``` gulp ``` on the command line to start the application.
3. Open the application on ``` http://localhost:8080``` and follow the instructions on the screen to upload the files.
4. Create a JSON file with the following format. You can upload multiple files that follows the format below:
```
[
  {
    "title": "I am proud to be an Andelan",
    "text": "Andela is looking to make world class technology from Africa"
  },

  {
    "title": "The Noisy Neighbours",
    "text": "My neighbours have been very noisy lately and this had led to many sleepless nights at home"
  }
]
```
5. Click the create index button to create an index
6. Click the get index button to see the index for a particulat file.
7. Enter any text(s) to search for and select the file or all files to search in.
8. Press the enter key to perform the search

### External Dependencies for the app
1. Javascript(ECMAScript 2015)
2. AngularJS
3. Gulp
4. Webpack
5. Node.js

#### How do I run the tests?
- To view the test on the browser, type ``` http://localhost:8082 ```  on the broswer
- running ``` npm test ``` on the command line also displays the result on the command line

#### What are the available endpoint?
The available endpoints of the api are listed below:
- Instantiate the Class
	``` const InvertedIndex = new InvertedIndex(); ```
- Create Index
	``` const createIndex  = InvertedIndex.createIndex(filename, fileContent); ```
- Get Index
	``` const getIndex = InvertedIndex.getIndex(fileName); ```
- Search Index
	``` const searchIndex = InvertedIndex.searchIndex(searchTerms, fileName); ```

#### What are the limitations of the api?
The limitations of this api is that the file has to be in a jSON format and also te JSON file has to be an array of Objects. The upload mechanism should allow for text file and also different word documents.


### Contributing
1. Fork this repository to your account.
2. Clone your repositry: git clone git@github.com:your-username/inverted-index.git OR git clone https://github.com/your-username/inverted-index.git
3. Create your feature branch: git checkout -b new-feature
4. Commit your changes: git commit -m "did something"
5. Push to the remote branch: git push origin new-feature
6. Open a pull request.