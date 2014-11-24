'use strict';
angular.module('Muellkalender.controller.dashboard', ['Muellkalender.services'])
.controller('DashboardCtrl', ['$scope','collections', function($scope,collections) {
    $scope.collections = [];

    var wastesearch = {
            'residual_waste_eco': 'a',
            'residual_waste': 2,
            'paper_waste': 1,
            'plastic_waste': 1,
            'bio_waste': 1,
            'bulk_waste': 1
        };

    collections.getNextCollections(0,wastesearch)
    .then(function(data){
        console.log(data);
        // $scope.collections = data;
    });


}]);