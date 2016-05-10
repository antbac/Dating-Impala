var datingControllers = angular.module('datingControllers', ['ngAnimate']).run(function($rootScope, $location) {
  $rootScope.location = $location;
});

  datingControllers.controller('homepageController', ['$scope', '$http', '$location', 'ResultsService',
  function($scope, $http, $location, results) {
    document.body.style.backgroundImage = "url('images/couple_beach.jpg')";
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
        money: $scope.money,
        interests: $scope.interests,
        personalities: $scope.personalities})
        .success(function(data, status) {
          console.log(data);
          results.results = data;
          $location.hash("");
          $location.path("/results");
        });
    };

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
    document.body.style.backgroundImage = "url('images/couple1.jpg')";
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
      var bmi = $scope.weight/($scope.height*$scope.height);
      var bodytype;
      if (bmi <= 18.5) {
        bodytype = "anorexic";
      }else if (bmi > 18.5 && bmi < 25) {
        bodytype = "standard";
      }else {
        bodytype = "fat";
      }

      $http.post('/API/register',
      {gender: $scope.gender,
        hair: $scope.hair,
        eye: $scope.eye,
        ocupation: $scope.ocupation,
        body: bodytype,
        age: $scope.age,
        living: $scope.living,
        education: $scope.education,
        money: $scope.money})
        .success(function(data, status) {
          alert("Thanks for joining Dating Impala");
          $location.hash("");
          $location.path("/homepage");
        });

    };
  }
]);

datingControllers.controller('resultsController', ['$scope', '$http', '$location', 'ResultsService',
  function($scope, $http, $location, results) {
    document.body.style.backgroundImage = "url('images/hearts.jpg')";
    if (!results.results.length) {
      $location.hash("");
      $location.path("/homepage");
    }
    console.log(results);
    $scope.results = results.results;
    for (var i = 0; i < $scope.results.length; i++) {
      $scope.results[i].active = false;
      $scope.results[i].int1 = $scope.results[i].interests.slice(0, Math.ceil($scope.results[i].interests.length/2));
      $scope.results[i].int2 = $scope.results[i].interests.slice(Math.ceil($scope.results[i].interests.length/2), $scope.results[i].interests.length);
      $scope.results[i].per1 = $scope.results[i].personalities.slice(0, Math.ceil($scope.results[i].personalities.length/2));
      $scope.results[i].per2 = $scope.results[i].personalities.slice(Math.ceil($scope.results[i].personalities.length/2), $scope.results[i].personalities.length);
      while ($scope.results[i].per1.length < $scope.results[i].int1.length) {
        $scope.results[i].per1.push("");
      }
      while ($scope.results[i].per1.length > $scope.results[i].int1.length) {
        $scope.results[i].int1.push("");
      }
      while ($scope.results[i].per2.length < $scope.results[i].int1.length) {
        $scope.results[i].per2.push("");
      }
      while ($scope.results[i].int2.length < $scope.results[i].int1.length) {
        $scope.results[i].int2.push("");
      }
    }
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
