'use strict';

// Declare app level module which depends on views, and components
angular.module('licenseManager', [
  'ngRoute',
  'ngResource',
  'licenseManager.services',
  'licenseManager.license.controllers',
  'licenseManager.license.routes',
  'licenseManager.license.services'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/license'});
}]);
