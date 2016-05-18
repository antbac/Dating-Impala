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
      if (!$scope.occupation) { alert("You have to fill in the occupation"); return;}
      if (!$scope.body) { alert("You have to fill in the body type"); return;}
      if (!$scope.age) { alert("You have to fill in the approximate age"); return;}
      if (!$scope.living) { alert("You have to fill in the living area"); return;}
      if (!$scope.education) { alert("You have to fill in the education"); return;}

      var interests = $scope.interests === undefined ? [] : $scope.interests.split(',').map(Function.prototype.call, String.prototype.trim);
      var personalities = $scope.personalities === undefined ? [] : $scope.personalities.split(',').map(Function.prototype.call, String.prototype.trim);

      $http.post('/API/search',
      {gender: $scope.gender,
        hair: $scope.hair,
        eye: $scope.eye,
        occupation: $scope.occupation,
        body: $scope.body,
        age: $scope.age,
        living: $scope.living,
        education: $scope.education,
        interests: interests,
        personalities: personalities})
        .success(function(data, status) {
          if (!data.length) {
            alert("Unfortunately there was no match for you");
            return;
          }
          results.results = data;
          $location.hash("");
          $location.path("/results");
        });
    };

    $http.get('/API/countmembers').success(function(response) {
      $scope.members = response;
      if($scope.members >= 10){
        $scope.magnitude = "10's";
      }
      if($scope.members >= 100){
        $scope.magnitude = "hundreds";
      }
      if($scope.members >= 1000){
        $scope.magnitude = "thousands";
      }
      if($scope.members >= 1000000){
        $scope.magnitude = "millions";
      }
      if($scope.members >= 1000000000){
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
      if (!$scope.name) { alert("You have enter your name"); return;}
      if (!$scope.hair) { alert("You have to fill in your hair color"); return;}
      if (!$scope.eye) { alert("You have to fill in your eye color"); return;}
      if (!$scope.height) { alert("You have to fill in your height"); return;}
      if (!$scope.occupation) { alert("You have to fill in your occupation"); return;}
      if (!$scope.weight) { alert("You have to fill in your weight"); return;}
      if (!$scope.age) { alert("You have to fill in your approximate age"); return;}
      if (!$scope.living) { alert("You have to fill in your living area"); return;}
      if (!$scope.education) { alert("You have to fill in your level of education"); return;}
      var bmi = $scope.weight/(($scope.height/100)*($scope.height/100));
      var bodytype;
      if (bmi <= 18.5) {
        bodytype = "anorexic";
      }else if (bmi > 18.5 && bmi < 25) {
        bodytype = "standard";
      }else {
        bodytype = "fat";
      }
      var interests = $scope.interests === undefined ? [] : $scope.interests.split(',').map(Function.prototype.call, String.prototype.trim);
      var personalities = $scope.personalities === undefined ? [] : $scope.personalities.split(',').map(Function.prototype.call, String.prototype.trim);

      $http.post('/API/register',
      {gender: $scope.gender,
        name: $scope.name,
        hair: $scope.hair,
        eye: $scope.eye,
        occupation: $scope.occupation,
        body: bodytype,
        age: $scope.age,
        living: $scope.living,
        education: $scope.education,
        interests: interests,
        personalities: personalities})
        .success(function(data, status) {
          alert("Thank you for joining Singles hive");
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
