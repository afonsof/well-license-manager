'use strict';

angular.module('licenseManager.license.controllers', [])

    .controller('LicenseListCtrl', function ($scope, $location, messageService, License) {
        $scope.licenses = License.query();

        $scope.deleteLicense = function (license) {
            if (messageService.confirm('Do you really want to delete this license?')) {
                License.delete({id: license._id}, function () {
                    $location.path('/license');
                });
            }
        }
    })

    .controller('LicenseViewCtrl', function ($scope, $routeParams, License) {
        $scope.license = License.get({id: $routeParams.id});
    })

    .controller('LicenseCreateCtrl', function ($scope, $location, License, selectBoxService) {
        $scope.license = new License();
        $scope.wellTypes = selectBoxService.wellTypes;
        $scope.statuses = selectBoxService.statuses;

        $scope.addLicense = function () {
            $scope.license.$save(function () {
                $location.path('/license');
            });
        }
    })

    .controller('LicenseEditCtrl', function ($scope, $location, $routeParams, messageService, License, selectBoxService) {
        $scope.license = License.get({id: $routeParams.id});
        $scope.wellTypes = selectBoxService.wellTypes;
        $scope.statuses = selectBoxService.statuses;

        $scope.updateLicense = function () {
            var id = $scope.license['_id'];
            delete $scope.license['_id'];
            delete $scope.license['dateModified'];
            delete $scope.license['dateIssued'];

            License.update({id: id}, $scope.license, function () {
                $location.path('/license');
                messageService.message('OK!');

            });
        };
    });