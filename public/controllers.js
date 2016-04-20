var datingControllers = angular.module('datingControllers', []).run(function($rootScope, $location) {
  $rootScope.location = $location;
});

  datingControllers.controller('homepageController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $scope.search = function() {
      console.log("Looking !!!");
    };
    
    $scope.temp = "Hello homepage";
    console.log($scope.temp);
    document.body.style.backgroundImage = "url('images/couple_beach.jpg')";

    $http.get('/API/countmembers').success(function(response) {
      $scope.members = response;
      if($scope.members > 10){
        $scope.magnitude = "10's";
      }
      if($scope.members > 100){
        $scope.magnitude = "hundreds";
      }
      if($scope.members > 1000){
        $scope.magnitude = "thousands";
      }
      if($scope.members > 1000000){
        $scope.magnitude = "millions";
      }
      if($scope.members > 1000000000){
        $scope.magnitude = "billions";
      }
    });
  }
]);

datingControllers.controller('registerController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $scope.temp = "Hello register";
    console.log($scope.temp);
    document.body.style.backgroundImage = "url('images/couple1.jpg')";
  }
]);

datingControllers.controller('resultController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $scope.temp = "Hello result";
    console.log($scope.temp);
    document.body.style.backgroundImage = "url('images/couple3.jpg')";
  }
]);

datingControllers.controller('navigationController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    // This function should direct the user to the wanted page
    $scope.redirect = function(address) {
      $location.hash("");
      $location.path("/" + address);
    };
  }
]);
