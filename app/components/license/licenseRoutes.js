'use strict';

angular.module('licenseManager.license.routes', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/components/license/views/list.html',
                controller: 'LicenseListCtrl'
            })
            .when('/view/:id', {
                templateUrl: '/components/license/views/view.html',
                controller: 'LicenseViewCtrl'
            })
            .when('/create', {
                templateUrl: '/components/license/views/create.html',
                controller: 'LicenseCreateCtrl'
            })
            .when('/edit/:id', {
                templateUrl: '/components/license/views/edit.html',
                controller: 'LicenseEditCtrl'
            });
    }]);