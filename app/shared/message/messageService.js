angular.module('licenseManager.message.service', [])
    .service('popupService', function ($window) {
        this.confirm = function (message) {
            return $window.confirm(message);
        };
        this.message = function (message) {
            return $window.alert(message);
        };
    });