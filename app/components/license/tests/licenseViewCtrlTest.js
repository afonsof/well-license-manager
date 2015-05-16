'use strict';

describe('Controllers', function () {

    beforeEach(module('licenseManager.license.controllers'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('LicenseViewCtrl', function () {
        var $scope, LicenseMock, $routeParamsMock;
        var getPromise = 'get promise';
        var expectedId = 123;

        beforeEach(function () {
            $scope = {};
            LicenseMock = {
                get: function (obj) {
                    expect(obj.id).toBe(expectedId);
                    return getPromise;
                }
            };
            $routeParamsMock = {id: expectedId};

            $controller('LicenseViewCtrl', {
                $scope: $scope,
                License: LicenseMock,
                $routeParams: $routeParamsMock
            });
        });

        it('should use resource to set $scope.license', function () {
            expect($scope.license).toEqual(getPromise);
        });
    });
});