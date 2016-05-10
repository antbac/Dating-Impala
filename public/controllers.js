var datingControllers = angular.module('datingControllers', []).run(function($rootScope, $location) {
  $rootScope.location = $location;
});

  datingControllers.controller('homepageController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    console.log("Using homepageController");
    $scope.search = function() {
      if (!$scope.gender) { alert("You have to fill in the gender"); return;}
      if (!$scope.hair) { alert("You have to fill in the hair color"); return;}
      if (!$scope.eye) { alert("You have to fill in the eye color"); return;}
      if (!$scope.ocupation) { alert("You have to fill in the ocupation"); return;}
      if (!$scope.body) { alert("You have to fill in the body type"); return;}
      if (!$scope.age) { alert("You have to fill in the approximate age"); return;}
      if (!$scope.living) { alert("You have to fill in the living area"); return;}
      if (!$scope.education) { alert("You have to fill in the education"); return;}
      if (!$scope.money) { alert("You have to fill in the money field"); return;}
      $http.post('/API/search',
      {gender: $scope.gender,
        hair: $scope.hair,
        eye: $scope.eye,
        ocupation: $scope.ocupation,
        body: $scope.body,
        age: $scope.age,
        living: $scope.living,
        education: $scope.education,
        money: $scope.money})
        .success(function(data, status) {
          for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
          }
        });
    };

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
    console.log("Using registerController");
    $scope.register = function() {
      if (!$scope.gender) { alert("You have to fill in your gender"); return;}
      if (!$scope.hair) { alert("You have to fill in your hair color"); return;}
      if (!$scope.eye) { alert("You have to fill in your eye color"); return;}
      if (!$scope.height) { alert("You have to fill in your height"); return;}
      if (!$scope.ocupation) { alert("You have to fill in your ocupation"); return;}
      if (!$scope.weight) { alert("You have to fill in your weight"); return;}
      if (!$scope.age) { alert("You have to fill in your approximate age"); return;}
      if (!$scope.living) { alert("You have to fill in your living area"); return;}
      if (!$scope.education) { alert("You have to fill in your level of education"); return;}
      if (!$scope.money) { alert("You have to fill in your money field"); return;}
      //$http.post('/API/countmembers').success(function(response) {}
      console.log("Registered");
    };
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
