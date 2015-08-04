'use strict';

angular.module('kesher.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'contactsCtrl'
  });
}])

.controller('contactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    var ref = new Firebase('https://kesher.firebaseio.com/contacts');
    
    $scope.contacts = $firebaseArray(ref);
    console.log($scope.contacts);
}]);