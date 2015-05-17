'use strict';

describe('Controllers', function () {

    beforeEach(module('licenseManager.license.controllers'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('LicenseCreateCtrl', function () {
        var $scope, LicenseMock, $routeParamsMock, $locationMock, selectBoxServiceMock;
        var idValue = 123;
        var expectedId = 123;
        var wellTypesExpected = 'wellTypesExpected';
        var statusesExpected = 'statusExpected';

        beforeEach(function () {
            $scope = {};
            LicenseMock = function () {
                this.id = idValue;
            };
            selectBoxServiceMock = {
                wellTypes: wellTypesExpected,
                statuses: statusesExpected
            };
            $routeParamsMock = {id: expectedId};
            $locationMock = {};

            $controller('LicenseCreateCtrl', {
                $scope: $scope,
                License: LicenseMock,
                $location: $locationMock,
                selectBoxService: selectBoxServiceMock
            });
        });

        it('should use resource to set $scope.license', function () {
            expect($scope.license.id).toEqual(idValue);
        });

        it('should fill select boxes', function () {
            expect($scope.wellTypes).toEqual(wellTypesExpected);
            expect($scope.statuses).toEqual(statusesExpected);
        });

        it('should create and redirect', function () {
            var saveWasCalled = false;
            var pathWasCalled = false;

            $scope.license.$save = function (callback) {
                saveWasCalled = true;
                callback();
            };
            $locationMock.path = function (str) {
                pathWasCalled = true;
                expect(str).toEqual('/');
            };
            $scope.addLicense();
            expect(saveWasCalled).toBe(true);
            expect(pathWasCalled).toBe(true);
        });
    });
});