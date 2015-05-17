'use strict';

describe('Controllers', function () {

    beforeEach(module('licenseManager.license.controllers'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('LicenseListCtrl', function () {
        var $scopeMock, LicenseMock, messageServiceMock, locationMock;
        var queryPromise = 'query promise';

        beforeEach(function () {
            $scopeMock = {};
            LicenseMock = {
                query: function () {
                    return queryPromise
                }
            };
            locationMock = {};
            messageServiceMock = {};
            $controller('LicenseListCtrl', {
                $scope: $scopeMock,
                License: LicenseMock,
                $location: locationMock,
                messageService: messageServiceMock
            });
        });

        it('should use resource to set $scope.license', function () {
            expect($scopeMock.licenses).toEqual(queryPromise);
        });

        it('should delete and redirect if confirm', function () {
            var license = {_id: 123};
            var deleteWasCalled = false;
            var pathWasCalled = false;
            messageServiceMock.confirm = function () {
                return true;
            };
            LicenseMock.delete = function (obj, callback) {
                deleteWasCalled = true;
                expect(obj.id).toEqual(license._id);
                callback();
            };
            locationMock.path = function (str) {
                pathWasCalled = true;
                expect(str).toEqual('/');
            };
            $scopeMock.deleteLicense(license);
            expect(deleteWasCalled).toBe(true);
            expect(pathWasCalled).toBe(true);
        });

        it('should not delete and not redirect if dont confirm', function () {
            var deleteWasCalled = false;
            var pathWasCalled = false;
            messageServiceMock.confirm = function () {
                return false;
            };
            LicenseMock.delete = function (obj, callback) {
                deleteWasCalled = true;
                callback();
            };
            locationMock.path = function () {
                pathWasCalled = true;
            };
            $scopeMock.deleteLicense({});
            expect(deleteWasCalled).toBe(false);
            expect(pathWasCalled).toBe(false);
        });
    });
});