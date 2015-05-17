'use strict';

describe('Controllers', function () {

    beforeEach(module('licenseManager.license.controllers'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('LicenseCreateCtrl', function () {
        var $scopeMock, LicenseMock, $routeParamsMock, $locationMock,
            selectBoxServiceMock, mapDataServiceMock, messageServiceMock;
        var idValue = 123;
        var expectedId = 123;
        var wellTypesExpected = 'wellTypesExpected';
        var statusesExpected = 'statusExpected';

        beforeEach(function () {
            $scopeMock = {};
            LicenseMock = function () {
                this.id = idValue;
            };
            selectBoxServiceMock = {
                wellTypes: wellTypesExpected,
                statuses: statusesExpected
            };
            mapDataServiceMock = {};
            messageServiceMock = {};
            $routeParamsMock = {id: expectedId};
            $locationMock = {};

            $controller('LicenseCreateCtrl', {
                $scope: $scopeMock,
                License: LicenseMock,
                $location: $locationMock,
                selectBoxService: selectBoxServiceMock,
                mapDataService: {
                    fromLicense: function () {
                    }
                },
                errorHandlerService: {},
                messageService: messageServiceMock
            });
        });

        it('should use resource to set $scope.license', function () {
            expect($scopeMock.license.id).toEqual(idValue);
        });

        it('should fill select boxes', function () {
            expect($scopeMock.wellTypes).toEqual(wellTypesExpected);
            expect($scopeMock.statuses).toEqual(statusesExpected);
        });

        it('should create and redirect', function () {
            //setup
            var saveWasCalled = false;
            var pathWasCalled = false;
            var messageWasCalled = false;

            $scopeMock.licenseForm = {$valid: true};
            messageServiceMock.message = function(msg){
                messageWasCalled = true;
                expect(msg).toEqual('License created.');
            };
            $scopeMock.license.$save = function (callback) {
                saveWasCalled = true;
                callback();
            };
            $locationMock.path = function (str) {
                pathWasCalled = true;
                expect(str).toEqual('/');
            };
            //excercise
            $scopeMock.addLicense();

            //verify
            expect(saveWasCalled).toBe(true);
            expect(pathWasCalled).toBe(true);
            expect(messageWasCalled).toBe(true);
        });

        it('should not create if form is invalid', function () {
            //setup
            var saveWasCalled = false;
            var errorMessageWasCalled = false;
            $scopeMock.licenseForm = {$valid: false};
            $scopeMock.license.$save = function (callback) {
                saveWasCalled = true;
                callback();
            };
            messageServiceMock.error = function(msg){
                errorMessageWasCalled = true;
                expect(msg).toEqual('There are errors in the form.');
            };

            //exercise
            $scopeMock.addLicense();

            //verify
            expect(saveWasCalled).toBe(false);
            expect(errorMessageWasCalled).toBe(true);

        });
    });
});