'use strict';
angular.module('licenseManager.shared')
    .service('messageService', ['$window', function ($window) {
        this.confirm = function (message) {
            return $window.confirm(message);
        };
        this.message = function (message) {
            Materialize.toast(message, 4000);
        };
        this.error = function (message) {
            Materialize.toast(message, 6000, 'red');
        };
    }]);