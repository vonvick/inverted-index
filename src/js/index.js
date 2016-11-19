
// import the angular package and other components

import angular from "angular";

import InvertedIndex from "./inverted-index.js";

angular.module("indexApp", [])
  .controller("InvertedIndexController", ["$scope", ($scope) => {
    const index = new InvertedIndex();

    $scope.files = {};
    $scope.fileNames = [];
    // $scope.document = [];
    $scope.searchResult = [];
    $scope.message = "";
    $scope.searchText = "";
    $scope.hidden = true;

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

    $scope.createIndex = (obj) => {
      const fileData = $scope.files[obj];
      const create = index.createIndex(obj, fileData);
    };

    $scope.getIndex = (title = null) => {
      if(title === null) {
        $scope.$apply(() => {
          $scope.hidden = false;
        });
        $scope.indexed = index.getIndex(title = null);
        return;
      } else {
        $scope.indexed = index.getIndex(title);
        $scope.document = $scope.files[title];
        $scope.title = title;
        // write code to disply result
        
        console.log($scope.indexed);
        console.log($scope.document);
        return;
      }
    };

    function findWrongFormat(element) {
      if(!element.hasOwnProperty("title") || !element.hasOwnProperty("text")) {
        return true;
      }
      return false;
    }
  }]);