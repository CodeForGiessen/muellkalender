'use strict';
angular.module('Muellkalender.controller.streets', ['Muellkalender.services'])
.controller('StreetsCtrl', ['$scope','streets', function($scope,streets) {
    $scope.streets = [];
    $scope.searchexpression = {};
    $scope.searchexpression.name = '';

    streets.getStreets()
    .success(function(data){
        $scope.streets = data;
    });
}]);