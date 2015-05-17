'use strict';
angular.module('licenseManager.license.services', ['ngResource'])
    .factory('License', ['$resource', function ($resource) {
        return $resource('http://petrofeed-coding-challenge.herokuapp.com/licenses/:id', null,
            {
                update: {
                    method: 'PUT'
                },
                delete: {
                    method: 'DELETE'
                },
                query: {
                    method: 'GET',
                    isArray: true,
                    cache: false
                }

            });
    }]);