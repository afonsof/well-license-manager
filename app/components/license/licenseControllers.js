'use strict';

angular.module('licenseManager.license.controllers', [])

    .controller('LicenseListCtrl', ['$scope', '$filter', '$location', 'License', 'mapDataService',
        'localStorageService',
        function ($scope, $filter, $location, License, mapDataService, localStorageService) {
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
            $scope.welcomeViewed = localStorageService.getItem('welcomeViewed');

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

            $scope.dimissWelcome = function(){
              $scope.welcomeViewed = true;
                localStorageService.setItem('welcomeViewed');
            };
        }])

    .controller('LicenseViewCtrl', ['$scope', '$routeParams', '$location', 'License', 'messageService',
        'mapDataService', 'errorHandlerService',
        function ($scope, $routeParams, $location, License, messageService,
                  mapDataService, errorHandlerService) {
            $scope.license = License.get({id: $routeParams.id}, function () {
                mapDataService.fromLicense($scope);
            });

            $scope.deleteLicense = function () {
                if (messageService.confirm('Do you really want to delete this license?')) {
                    License.delete({id: $scope.license._id}, function () {
                        messageService.message('License deleted.');
                        $location.path('/');
                    }, errorHandlerService.handleServerResponse);
                }
            };
        }])

    .controller('LicenseCreateCtrl', ['$scope', '$location', 'License', 'selectBoxService',
        'mapDataService', 'errorHandlerService', 'messageService',
        function ($scope, $location, License, selectBoxService,
                  mapDataService, errorHandlerService, messageService) {
            $scope.license = new License();
            $scope.wellTypes = selectBoxService.wellTypes;
            $scope.statuses = selectBoxService.statuses;
            $scope.license.latitude = 51.013117;
            $scope.license.longitude = -114.0741556;
            $scope.license.status = 'active';
            mapDataService.fromLicense($scope, true);

            $scope.addLicense = function () {
                if (!$scope.licenseForm.$valid) {
                    messageService.error('There are errors in the form.');
                    return;
                }
                $scope.license.$save(function () {
                    messageService.message('License created.');
                    $location.path('/');
                }, errorHandlerService.handleServerResponse);
            };
        }])

    .controller('LicenseEditCtrl', ['$scope', '$location', '$routeParams', 'mapDataService',
        'messageService', 'License', 'selectBoxService', 'errorHandlerService',
        function ($scope, $location, $routeParams, mapDataService,
                  messageService, License, selectBoxService, errorHandlerService) {
            $scope.license = License.get({id: $routeParams.id}, function () {
                mapDataService.fromLicense($scope, true);
            });
            $scope.wellTypes = selectBoxService.wellTypes;
            $scope.statuses = selectBoxService.statuses;

            $scope.updateLicense = function () {
                if (!$scope.licenseForm.$valid) {
                    messageService.error('There are errors in the form.');
                    return;
                }
                var tempLicense = angular.copy($scope.license);

                var id = tempLicense._id;
                delete tempLicense._id;
                delete tempLicense.dateModified;
                delete tempLicense.dateIssued;

                License.update({id: id}, tempLicense, function () {
                    $location.path('/');
                    messageService.message('License updated.');
                }, errorHandlerService.handleServerResponse);
            };
        }]);