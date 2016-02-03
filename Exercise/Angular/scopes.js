var module = angular.module('scopeExample', []);

module.controller('GreetController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.name = 'World';
  $rootScope.department = 'Angular';
}]);


module.controller('ListController', ['$scope', function($scope) {
  $scope.names = ['Igor', 'Misko', 'Vojta'];
}]);