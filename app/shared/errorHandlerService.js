'use strict';
angular.module('licenseManager.shared')
    .service('errorHandlerService', ['messageService', function (messageService) {
        this.handleServerResponse = function (res) {
            if (res.data && res.data.errors && res.data.errors.length) {
                for (var i = 0; i < res.data.errors.length; i++) {
                    messageService.error(res.data.errors[i]);
                }
            }
        };
    }]);