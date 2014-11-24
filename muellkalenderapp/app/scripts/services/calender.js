'use strict';

/*global calender*/
angular.module('Muellkalender.services')
.factory('calender',  ['$q',function ($q) {
    var getCalender = function() {
        var deferred = $q.defer();
        var promise = deferred.promise;

        promise.success = function(fn){
            promise.then(fn);
            return promise;
        };
        
        deferred.resolve(calender);

        return promise;
    };

    return {
        getCalender: getCalender
    };
}]);
