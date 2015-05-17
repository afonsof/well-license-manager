'use strict';

describe('Controllers', function () {

    beforeEach(module('licenseManager.license.controllers'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('LicenseListCtrl', function () {
        var $scopeMock, LicenseMock, messageServiceMock, locationMock, mapDataServiceMock,
            localStorageServiceMock;
        var queryPromise = 'query promise';
        var watchWasCalled = false;

        beforeEach(function () {
            $scopeMock = {
                $watch: function () {
                    watchWasCalled = true;
                }
            };
            LicenseMock = {
                query: function () {
                    return queryPromise;
                }
            };
            locationMock = {};
            messageServiceMock = {};
            mapDataServiceMock = {};
            localStorageServiceMock = {
                getItem: function () {
                    return true;
                }
            };

            $controller('LicenseListCtrl', {
                $scope: $scopeMock,
                License: LicenseMock,
                $location: locationMock,
                messageService: messageServiceMock,
                mapDataService: mapDataServiceMock,
                localStorageService: localStorageServiceMock
            });
        });

        it('should use resource to set $scope.license', function () {
            expect($scopeMock.licenses).toEqual(queryPromise);
            expect($scopeMock.welcomeViewed).toEqual(true);
            expect(watchWasCalled).toEqual(true);
        });
    });
});