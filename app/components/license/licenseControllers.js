'use strict';

angular.module('licenseManager.license.controllers', [])

    .controller('LicenseListCtrl', function ($scope, $filter, $location, messageService, License, mapDataService) {
        $scope.licenses = License.query(function () {
            redrawMarkers();
        });

        $scope.$watch('searchString', function () {
            redrawMarkers();
        });

        function redrawMarkers() {
            $scope.filtered = $filter('filter')($scope.licenses, $scope.searchString);
            mapDataService.fromLicenses($scope);
        }

        $scope.viewLicense = function (id) {
            $scope.$apply(function () {
                $location.path(['/view/', id].join(''));
            });
        };

        $scope.showMap = '';

        $scope.search = function () {
            $scope.clearSearch();
            $scope.searching = true;
        };

        $scope.cancelSearch = function () {
            $scope.clearSearch();
            $scope.searching = false;
        };

        $scope.clearSearch = function () {
            $scope.searchString = '';
        };
    })

    .controller('LicenseViewCtrl', function ($scope, $routeParams, $location, License, messageService, mapDataService) {
        $scope.license = License.get({id: $routeParams.id}, function () {
            mapDataService.fromLicense($scope);
        });

        $scope.deleteLicense = function () {
            if (messageService.confirm('Do you really want to delete this license?')) {
                License.delete({id: $scope.license._id}, function () {
                    $location.path('/');
                });
            }
        };
    })

    .controller('LicenseCreateCtrl', function ($scope, $location, License, selectBoxService, mapDataService) {
        $scope.license = new License();
        $scope.wellTypes = selectBoxService.wellTypes;
        $scope.statuses = selectBoxService.statuses;
        $scope.license.latitude = 51.013117;
        $scope.license.longitude = -114.0741556;
        $scope.license.status = 'active';
        mapDataService.fromLicense($scope, true);


        $scope.addLicense = function () {
            $scope.license.$save(function () {
                $location.path('/');
            });
        }
    })

    .controller('LicenseEditCtrl', function ($scope, $location, $routeParams, mapDataService, messageService, License, selectBoxService) {
        $scope.license = License.get({id: $routeParams.id}, function(){
            mapDataService.fromLicense($scope, true);
        });
        $scope.wellTypes = selectBoxService.wellTypes;
        $scope.statuses = selectBoxService.statuses;

        $scope.updateLicense = function () {
            var id = $scope.license['_id'];
            delete $scope.license['_id'];
            delete $scope.license['dateModified'];
            delete $scope.license['dateIssued'];

            License.update({id: id}, $scope.license, function () {
                $location.path('/');
                messageService.message('OK!');

            });
        };
    });