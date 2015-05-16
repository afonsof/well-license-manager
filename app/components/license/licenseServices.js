angular.module('licenseManager.license.services', ['ngResource'])

    .factory('License', function ($resource) {
        return $resource('http://petrofeed-coding-challenge.herokuapp.com/licenses/:id', null,
            {
                update: {
                    method: 'PUT'
                },
                delete: {
                    method: 'DELETE'
                }
            });
    });