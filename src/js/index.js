
// import the angular package and other components

const angular = require("angular")

angular.module("indexApp", [])
  .controller("InvertedIndexController", ["$scope", ($scope) => {
    const index = new InvertedIndex();

    $scope.files = {};
    $scope.fileNames = [];
    $scope.message = "";
    $scope.searchText = "";
    $scope.showIntro = true;
    $scope.hideTable = true;
    $scope.showResult = false;

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
              } else if($scope.fileNames.includes(fileName)) {
                $scope.message = "The file has been uploaded before";
                return;
              }
              $scope.$apply(() => {
                $scope.fileNames.push(fileName);
                $scope.files[fileName] = jsonData;
                $scope.message = "The file has been successfully uploaded";
              });
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

      if(file === undefined) {
        $scope.message = "You are searching an unindexed file";
      } else if (file === "all") {
        $scope.searchResult = index.searchIndex(searchItem, file = null);
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