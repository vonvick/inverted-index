
// import the angular package and other components

const angular = require("angular")

angular.module("indexApp", [])
  .controller("InvertedIndexController", ["$scope", ($scope) => {
    const index = new InvertedIndex();

    $scope.files = {};
    $scope.fileNames = [];
    $scope.searchText = "";
    $scope.showIntro = true;
    $scope.hideTable = true;
    $scope.showResult = false;

    $scope.uploadFile = () => {
      $scope.error = "";
      $scope.success = "";
      const file = document.forms["upload-form"]["json-file"].files[0];
      const fileName = file.name.replace(/\s+/, "");
      if(file) {
        if(!fileName.match(/\.json$/i)) {
          $scope.error = "Invalid file format";
          return;
        }
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const jsonData = JSON.parse(evt.target.result);
            console.log(jsonData);
              if(jsonData.find(findWrongFormat)){
                $scope.$apply(() => {
                  $scope.error = "The .json file did not follow " +
                    "the required format";
                });
                return;
              } else if($scope.fileNames.includes(fileName)) {
                $scope.$apply(() => {
                  $scope.error = "The file has been uploaded before";
                });
                return;
              } else if(jsonData.length < 1 || Array.isArray(jsonData === false)) {
                $scope.$apply(() => {
                  $scope.error = "This file is empty or not an Array of object";
                });
                return;
              }
              $scope.$apply(() => {
                $scope.fileNames.push(fileName);
                $scope.files[fileName] = jsonData;
                $scope.success = "The file has been successfully uploaded";
              });
          }
          catch(error) {
            $scope.$apply(() => {
              $scope.error = "Invalid .json file";
            });
          }
        };
        reader.readAsBinaryString(file);
      }
    };

    $scope.createIndex = (obj) => {
      const fileData = $scope.files[obj];
      const create = index.createIndex(obj, fileData);
    };

    $scope.getIndex = (title) => {
      $scope.indexed = index.getIndex(title);
      $scope.document = $scope.files[title];
      $scope.title = title;
      $scope.showIntro = false;
      $scope.hideTable = false;
      $scope.showResult = false;
      return;
    };

    $scope.searchIndex = () => {
      let searchItem = $scope.searchText;
      let file = $scope.selected;
      console.log(file)

      if(file === undefined) {
        $scope.success = "";
        $scope.error = "You are searching an unindexed file";
      } else if (file === "all") {
        $scope.searchResult = index.searchIndex(searchItem, null);
        console.log($scope.searchResult);
        $scope.searchTerms = searchItem;
        $scope.showResult = true;
        $scope.hideTable = true;
      } else {
        $scope.searchResult = index.searchIndex(searchItem, file);
        $scope.searchTerms = searchItem;
        $scope.showResult = true;
        $scope.hideTable = true;
      }
    };

    function findWrongFormat(element) {
      if(!element.hasOwnProperty("title") || !element.hasOwnProperty("text")) {
        return true;
      }
      return false;
    }
  }]);