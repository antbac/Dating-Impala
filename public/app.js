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
        templateUrl: 'homepage.html',
        controller: 'homepageController'
      }).
      when('/register', {
        templateUrl: 'register.html',
        controller: 'registerController'
      }).
      when('/search', {
        templateUrl: 'search.html',
        controller: 'searchController'
      }).
      when('/result', {
        templateUrl: 'result.html',
        controller: 'resultController'
      }).
      otherwise({
        redirectTo: '/homepage'
      });
  }]);
})();
