(function() {
  angular.module('dating')
  .factory('ResultsService', function() {
    var results = [];
    return {
      results: results
    };
  })
})();
