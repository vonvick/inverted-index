
// import the angular package and other components

import angular from "angular";

import InvertedIndex from "./inverted-index.js";

angular.module("indexApp", [])
  .controller("InvertedIndexController", ["$scope", ($scope) => {
    const index = new InvertedIndex();

    $scope.files = [];
    $scope.searchResult = [];
    $scope.message = "";
    $scope.searchText = "I love you";

    $scope.uploadFile = () => {
      const file = document.forms["upload-form"]["json-file"].files[0];
      if(file) {
        if(!file.name.match(/\.json$/i)) {
          $scope.message = "Invalid file format";
          return;
        }
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const jsonData = JSON.parse(evt.target.result);
            if(!(jsonData[0].title || jsonData[0].text)) {
              $scope.message = "The .json file did not follow " +
                "the required format";
              return;
            }
            console.log(jsonData);
          }
          catch(error) {
            $scope.message = "Invalid .json file";
          }
        };
        reader.readAsBinaryString(file);
      }

    };
  }]);