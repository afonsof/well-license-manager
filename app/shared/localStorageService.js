'use strict';
angular.module('licenseManager.shared')
    .service('localStorageService', ['$window', function ($window) {
        this.getItem = function (key) {
            return $window.localStorage.getItem(key);
        };
        this.setItem = function (key, value) {
            return $window.localStorage.setItem(key, value);
        };
    }]);