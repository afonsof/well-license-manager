'use strict';

describe('Controllers', function () {

    beforeEach(module('licenseManager.license.controllers'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('LicenseViewCtrl', function () {
        var $scopeMock, LicenseMock, $routeParamsMock, messageServiceMock, mapDataServiceMock,
            errorHandlerServiceMock, $locationMock;
        var expectedId = 123;
        var getPromise = { _id: expectedId};

        beforeEach(function () {
            $scopeMock = {};
            LicenseMock = {
                get: function (obj) {
                    expect(obj.id).toBe(expectedId);
                    return getPromise;
                }
            };
            $routeParamsMock = {id: expectedId};
            messageServiceMock = {};
            mapDataServiceMock = {};
            errorHandlerServiceMock = {};
            $locationMock = {};

            $controller('LicenseViewCtrl', {
                $scope: $scopeMock,
                License: LicenseMock,
                $routeParams: $routeParamsMock,
                messageService: messageServiceMock,
                mapDataService: mapDataServiceMock,
                errorHandlerService: errorHandlerServiceMock,
                $location: $locationMock
            });
        });

        it('should use resource to set $scope.license', function () {
            expect($scopeMock.license).toEqual(getPromise);
        });

        it('should delete and redirect if confirm', function () {
            //setup
            var license = {_id: 123};
            var deleteWasCalled = false;
            var pathWasCalled = false;
            var messageWasCalled = false;
            var confirmWasCalled = false;

            messageServiceMock.confirm = function () {
                confirmWasCalled = true;
                return true;
            };
            messageServiceMock.message = function(){
                messageWasCalled = true;
            };

            LicenseMock.delete = function (obj, callback) {
                deleteWasCalled = true;
                expect(obj.id).toEqual(license._id);
                callback();
            };
            $locationMock.path = function (str) {
                pathWasCalled = true;
                expect(str).toEqual('/');
            };

            //exercise
            $scopeMock.deleteLicense(license);

            //verify
            expect(messageWasCalled).toBe(true);
            expect(deleteWasCalled).toBe(true);
            expect(pathWasCalled).toBe(true);
            expect(confirmWasCalled).toBe(true);
        });

        it('should not delete and not redirect if dont confirm', function () {
            //setup
            var deleteWasCalled = false;
            var pathWasCalled = false;
            messageServiceMock.confirm = function () {
                return false;
            };
            LicenseMock.delete = function (obj, callback) {
                deleteWasCalled = true;
                callback();
            };
            $locationMock.path = function () {
                pathWasCalled = true;
            };

            //exercise
            $scopeMock.deleteLicense({});

            //verify
            expect(deleteWasCalled).toBe(false);
            expect(pathWasCalled).toBe(false);
        });
    });
});