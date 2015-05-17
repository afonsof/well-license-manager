angular.module('licenseManager.shared')
    .service('mapDataService', function ($filter) {
        var mapOptions = {
            scrollwheel: false,
            streetViewControl: false,
            mapTypeControl: false
        };

        function getIcon(status) {
            return ['assets/img/marker-', status, '.svg'].join('');
        }

        this.fromLicense = function ($scope, draggable) {
            $scope.map = {
                center: {
                    latitude: $scope.license.latitude,
                    longitude: $scope.license.longitude
                },
                zoom: 8,
                marker: {
                    key: $scope.license._id || 'key',
                    icon: getIcon($scope.license.status)
                },
                options: mapOptions
            };

            $scope.marker = {
                id: $scope.license._id || 'key',
                coords: {
                    latitude: $scope.license.latitude,
                    longitude: $scope.license.longitude
                },
                options: {
                    draggable: draggable,
                    icon: getIcon($scope.license.status)
                },
                events: {
                    dragend: function (marker) {
                        $scope.license.latitude = marker.getPosition().lat();
                        $scope.license.longitude = marker.getPosition().lng();
                    }
                }
            };
        };

        this.fromLicenses = function ($scope) {
            $scope.markers = [];

            var maxLat, minLat, maxLon, minLon, markers = [];
            for (var i = 0; i < $scope.filtered.length; i++) {
                var license = $scope.filtered[i];
                if (!maxLat || maxLat < license.latitude) {
                    maxLat = license.latitude;
                }
                if (!maxLon || maxLon < license.longitude) {
                    maxLon = license.longitude;
                }
                if (!minLat || minLat > license.latitude) {
                    minLat = license.latitude;
                }
                if (!minLon || minLon > license.longitude) {
                    minLon = license.longitude;
                }

                markers.push({
                    latitude: license.latitude,
                    longitude: license.longitude,
                    title: license.company,
                    id: license._id,
                    icon: getIcon(license.status)
                });
            }
            if (!$scope.map) {
                $scope.map = {
                    center: {
                        latitude: (maxLat - minLat) / 2 + minLat,
                        longitude: (maxLon - minLon) / 2 + minLon
                    },
                    zoom: 8
                };
                $scope.options = mapOptions;
            }

            $scope.markers = markers;
        }
    });