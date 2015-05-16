'use strict';

describe('Controllers', function () {

    beforeEach(module('licenseManager.license.controllers'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('LicenseEditCtrl', function () {
        var $scopeMock, LicenseMock, $routeParamsMock, popupServiceMock, $locationMock;
        var getPromise = 'get promise';
        var expectedId = 123;

        beforeEach(function () {
            $scopeMock = {};
            LicenseMock = {
                get: function (obj) {
                    expect(obj.id).toBe(expectedId);
                    return getPromise;
                }
            };
            $routeParamsMock = {id: expectedId};
            popupServiceMock = {};
            $locationMock = {};

            $controller('LicenseEditCtrl', {
                $scope: $scopeMock,
                License: LicenseMock,
                $routeParams: $routeParamsMock,
                $location: $locationMock,
                popupService: popupServiceMock
            });
        });

        it('should use resource to set $scope.license', function () {
            expect($scopeMock.license).toEqual(getPromise);
        });

        it('should edit, redirect and show message', function () {
            var license = {_id: 123};
            var deleteWasCalled = false;
            var pathWasCalled = false;
            var messageCalled = '';
            popupServiceMock.message = function (msg) {
                messageCalled = msg;
            };
            LicenseMock.update = function (obj, license, callback) {
                deleteWasCalled = true;
                expect(obj.id).toEqual(license._id);
                expect(license._id).toEqual(undefined);
                expect(license.dateIssued).toEqual(undefined);
                expect(license.dateModified).toEqual(undefined);
                callback();
            };
            $locationMock.path = function (str) {
                pathWasCalled = true;
                expect(str).toEqual('/license');
            };
            $scopeMock.updateLicense(license);
            expect(deleteWasCalled).toBe(true);
            expect(pathWasCalled).toBe(true);
            expect(messageCalled).toBe('OK!');
        });
    });
});