
// import the angular package and other components

import angular from "angular";

import InvertedIndex from "./inverted-index.js";

angular.module("indexApp", [])
  .controller("InvertedIndexController", ["$scope", ($scope) => {
    const index = new InvertedIndex();

    $scope.files = {};
    $scope.fileNames = [];
    $scope.searchResult = [];
    $scope.message = "";
    $scope.searchText = "";

    $scope.uploadFile = () => {
      const file = document.forms["upload-form"]["json-file"].files[0];
      const fileName = file.name.replace(/\s+/, "");
      if(file) {
        if(!fileName.match(/\.json$/i)) {
          $scope.message = "Invalid file format";
          return;
        }
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const jsonData = JSON.parse(evt.target.result);
              if(jsonData.find(findWrongFormat)){
                $scope.$apply(() => {
                  $scope.message = "The .json file did not follow " +
                    "the required format";
                });
                return;
              } 
              $scope.$apply(() => {
                $scope.fileNames.push(fileName);
                $scope.files[fileName] = jsonData;
                $scope.message = "The file has been successfully uploaded";
              });
              console.log(fileName);
              console.log(jsonData);
          }
          catch(error) {
            $scope.message = "Invalid .json file";
          }
        };
        reader.readAsBinaryString(file);
      }
    };

    function findWrongFormat(element) {
      if(!element.hasOwnProperty("title") || !element.hasOwnProperty("text")) {
        return true;
      }
      return false;
    }
  }]);