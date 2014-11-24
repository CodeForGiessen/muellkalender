'use strict';

/*global streets*/
angular.module('Muellkalender.services')
.factory('streets',  ['$q',function ($q) {
    var streetsWithId;

    var getIdToStreet = function(s){
        var i = 0;
        return s.map(function(element){
            element.id = i++;
            return element;
        });
    };

    var getStreets = function() {
        var deferred = $q.defer();
        var promise = deferred.promise;

        promise.success = function(fn){
            promise.then(fn);
            return promise;
        };
        
        if(typeof streetsWithId === 'undefined'){
            streetsWithId = getIdToStreet(streets);
        }
        deferred.resolve(streetsWithId);

        return promise;
    };

    var getStreetById = function(id){
        return getStreets()
        .then(function(streets){
            return streets[id];
        });
    };

    return {
        getStreets: getStreets,
        getStreetById: getStreetById
    };
}]);


