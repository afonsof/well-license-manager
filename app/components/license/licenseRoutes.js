'use strict';

angular.module('licenseManager.license.routes', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/license', {
                templateUrl: '/components/license/views/list.html',
                controller: 'LicenseListCtrl'
            })
            .when('/license/view/:id', {
                templateUrl: '/components/license/views/view.html',
                controller: 'LicenseViewCtrl'
            })
            .when('/license/create', {
                templateUrl: '/components/license/views/create.html',
                controller: 'LicenseCreateCtrl'
            })
            .when('/license/edit/:id', {
                templateUrl: '/components/license/views/edit.html',
                controller: 'LicenseEditCtrl'
            });
    }]);