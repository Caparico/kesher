'use strict';

// Declare app level module which depends on views, and components
angular.module('kesher', [
  'ngRoute',
    'firebase',
    'kesher.contacts'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
