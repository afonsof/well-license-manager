'use strict';
angular.module('licenseManager.shared')
    .service('selectBoxService', function () {
        this.wellTypes = [
            'New Field Wildcat',
            'New Pool Wildcat',
            'Deeper Pool Test',
            'Shallower Pool Test',
            'Development Well'
        ];
        this.statuses = [
            'active',
            'confidential',
            'expired'
        ];
    });