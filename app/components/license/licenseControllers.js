'use strict';

angular.module('licenseManager.license.controllers', [])

    .controller('LicenseListCtrl', function ($scope, $location, popupService, License) {

        $scope.licenses = License.query();

        $scope.deleteLicense = function (license) {
            if (popupService.confirm('Do you really want to delete this license?')) {
                License.delete({id: license._id} , function () {
                    $location.path('/license');
                });
            }
        }
    })

    .controller('LicenseViewCtrl', function ($scope, $routeParams, License) {
        $scope.license = License.get({id: $routeParams.id});
    })

    .controller('LicenseCreateCtrl', function ($scope, $location, License) {

        $scope.license = new License();

        $scope.addLicense = function () {
            $scope.license.$save(function () {
                $location.path('/license');
            });
        }
    })

    .controller('LicenseEditCtrl', function ($scope, $location, $routeParams, popupService, License) {

        $scope.license = License.get({id: $routeParams.id});

        $scope.updateLicense = function () {
            var id = $scope.license['_id'];
            delete $scope.license['_id'];
            delete $scope.license['dateModified'];
            delete $scope.license['dateIssued'];

            License.update({id: id}, $scope.license, function () {
                $location.path('/license');
                popupService.message('OK!');

            });
        };
    });