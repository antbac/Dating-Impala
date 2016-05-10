(function(){
  var app = angular.module("dating", [
  'ngRoute',
  'datingControllers',
  'ui.bootstrap',
  'ngAnimate'
  ]);

  app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/homepage', {
        templateUrl: 'templates/homepage.html',
        controller: 'homepageController'
      }).
      when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'registerController'
      }).
      when('/search', {
        templateUrl: 'templates/search.html',
        controller: 'searchController'
      }).
      when('/results', {
        templateUrl: 'templates/results.html',
        controller: 'resultsController'
      }).
      otherwise({
        redirectTo: '/homepage'
      });
  }]);
})();
