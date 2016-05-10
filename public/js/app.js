(function(){
  var app = angular.module("dating", [
  'ngRoute',
  'datingControllers',
  'ui.bootstrap'
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
      when('/result', {
        templateUrl: 'templates/result.html',
        controller: 'resultController'
      }).
      otherwise({
        redirectTo: '/homepage'
      });
  }]);
})();
