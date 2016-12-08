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

#### What are the  external dependencies of the api?
The external endpoints of the api are listed below:
``` const InvertedIndex = new InvertedIndex(); ```
- Create Index
	``` const createIndex  = InvertedIndex.createIndex(filename, fileContent); ```
- Get Index
	``` const getIndex = InvertedIndex.getIndex(fileName); ```
- Search Index
	``` const searchIndex = InvertedIndex.searchIndex(searchTerms, fileName); ```

#### How do I run the tests?
- To view the test on the browser, type ``` http://localhost:8082 ```  on the broswer
- running ``` npm test ``` on the command line also displays the result on the command line
- What are the available endpoint?

#### What are the limitations of the api?
The limitations of this api is that the file has to be in a jSON format and also te JSON file has to be an array of Objects. The upload mechanism should allow for text file and also different word documents.

### Tools
1. Javascript
2. Angular
3. Gulp
4. Webpack
5. Travis ci
6. Karma
7. Jasmine
8. Coveralls
9. ESLint
10. Code Climate