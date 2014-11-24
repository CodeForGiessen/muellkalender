'use strict';
angular.module('Muellkalender.controller.street', ['Muellkalender.services','ionic'])
.controller('StreetCtrl', ['$scope','streets','collections','$stateParams','$ionicLoading', function($scope,streets,collections,$stateParams,$ionicLoading) {
    $scope.id = $stateParams.streetId;
    $scope.street = {
        name: ''
    };
    $scope.collections = [];

    $ionicLoading.show({
        template: 'Loading...'
    });

    var getCollectionsArrayFromObject = function(collectionsobject){
        var wastes = [
        {
            shortname: 'residual_waste_eco',
            name:'Restmüll (klein)',
            icon: 'ion-chatbubble'
        },
        {
            shortname: 'residual_waste',
            name:'Restmüll',
            icon: 'ion-chatbubble'
        },
        {
            shortname: 'plastic_waste',
            name:'Plastikmüll',
            icon: 'ion-chatbubble'
        },
        {
            shortname: 'paper_waste',
            name:'Papiermüll',
            icon: 'ion-chatbubble'
        },
        {
            shortname: 'bio_waste',
            name:'Biomüll',
            icon: 'ion-chatbubble'
        }
        ];

        return wastes.map(function(waste){
            var date = collectionsobject[waste.shortname];
            if(typeof date === 'undefined'){
                date = 'Nicht bekannt';
            }
            return {
                name: waste.name,
                icon: waste.icon,
                date: date
            };
        });
    };

    streets.getStreetById($scope.id)
    .then(function(street){
        $scope.street = street;
        var day = street.day;
        var wastesearch = street;
        wastesearch.day = undefined;
        wastesearch.name = undefined;
        return collections.getNextCollections(day,wastesearch);
    })
    .then(function(nextCollections){
        console.log(nextCollections);
        $scope.collections = getCollectionsArrayFromObject(nextCollections);
        $ionicLoading.hide();
    });
}]);