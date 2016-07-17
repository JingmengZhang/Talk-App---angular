'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngStorage',
  'ngSanitize',
  'emoji',
  'myApp.list',
  'myApp.detail',
  'myApp.messages-factory',
  'myApp.list.dateFormat-filter',
  'myApp.list.lastMsg-filter',
  'myApp.detail.widthFixed-filter',
  'myApp.detail.fdInput-directive',
  'myApp.detail.myEnter-directive',
  'myApp.version'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
