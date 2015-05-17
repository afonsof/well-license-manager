'use strict';

describe('Controllers', function () {

    beforeEach(module('licenseManager.license.controllers'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('LicenseEditCtrl', function () {
        var $scopeMock, LicenseMock, $routeParamsMock, messageServiceMock, $locationMock, selectBoxServiceMock;
        var getPromise = 'get promise';
        var expectedId = 123;
        var wellTypesExpected = 'wellTypesExpected';
        var statusesExpected = 'statusExpected';

        beforeEach(function () {
            $scopeMock = {};
            LicenseMock = {
                get: function (obj) {
                    expect(obj.id).toBe(expectedId);
                    return getPromise;
                }
            };
            selectBoxServiceMock = {
                wellTypes: wellTypesExpected,
                statuses: statusesExpected
            };
            $routeParamsMock = {id: expectedId};
            messageServiceMock = {};
            $locationMock = {};

            $controller('LicenseEditCtrl', {
                $scope: $scopeMock,
                License: LicenseMock,
                $routeParams: $routeParamsMock,
                $location: $locationMock,
                messageService: messageServiceMock,
                selectBoxService: selectBoxServiceMock
            });
        });

        it('should use resource to set $scope.license', function () {
            expect($scopeMock.license).toEqual(getPromise);
        });

        it('should fill select boxes', function () {
            expect($scopeMock.wellTypes).toEqual(wellTypesExpected);
            expect($scopeMock.statuses).toEqual(statusesExpected);
        });

        it('should edit, redirect and show message', function () {
            var license = {_id: 123};
            var deleteWasCalled = false;
            var pathWasCalled = false;
            var messageCalled = '';
            messageServiceMock.message = function (msg) {
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
                expect(str).toEqual('/');
            };
            $scopeMock.updateLicense(license);
            expect(deleteWasCalled).toBe(true);
            expect(pathWasCalled).toBe(true);
            expect(messageCalled).toBe('OK!');
        });
    });
});