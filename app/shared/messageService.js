angular.module('licenseManager.shared')
    .service('messageService', function ($window) {
        this.confirm = function (message) {
            return $window.confirm(message);
        };
        this.message = function (message) {
            return $window.alert(message);
        };
    });