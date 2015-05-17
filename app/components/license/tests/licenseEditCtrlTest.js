'use strict';

describe('Controllers', function () {

    beforeEach(module('licenseManager.license.controllers'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('LicenseEditCtrl', function () {
        var $scopeMock, LicenseMock, $routeParamsMock, messageServiceMock, $locationMock,
            selectBoxServiceMock, mapDataServiceMock, errorHandlerServiceMock;
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
            mapDataServiceMock = {};
            errorHandlerServiceMock = {};

            $controller('LicenseEditCtrl', {
                $scope: $scopeMock,
                License: LicenseMock,
                $routeParams: $routeParamsMock,
                $location: $locationMock,
                messageService: messageServiceMock,
                selectBoxService: selectBoxServiceMock,
                mapDataService: mapDataServiceMock,
                errorHandlerService: errorHandlerServiceMock
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
            //setup
            var license = {_id: 123};
            var updateWasCalled = false;
            var pathWasCalled = false;
            var messageCalled = '';
            messageServiceMock.message = function (msg) {
                messageCalled = msg;
            };
            LicenseMock.update = function (obj, license, callback) {
                updateWasCalled = true;
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
            $scopeMock.licenseForm = { $valid: true };
            //exercise
            $scopeMock.updateLicense(license);

            //verify
            expect(updateWasCalled).toBe(true);
            expect(pathWasCalled).toBe(true);
            expect(messageCalled).toBe('License updated.');
        });

        it('should not edit if form is invalid', function () {
            //setup
            var license = {_id: 123};
            var updateWasCalled = false;
            var errorWasCalled = false;
            messageServiceMock.error = function (msg) {
                expect(msg).toEqual('There are errors in the form.');
                errorWasCalled = true;
            };
            LicenseMock.update = function (obj, license, callback) {
                updateWasCalled = true;
                expect(obj.id).toEqual(license._id);
                expect(license._id).toEqual(undefined);
                expect(license.dateIssued).toEqual(undefined);
                expect(license.dateModified).toEqual(undefined);
                callback();
            };
            $scopeMock.licenseForm = { $valid: false };
            //exercise
            $scopeMock.updateLicense(license);

            //verify
            expect(updateWasCalled).toBe(false);
            expect(errorWasCalled).toBe(true);
        });
    });
});