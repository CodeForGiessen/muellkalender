'use strict';
angular.module('Muellkalender.directives')
.directive('startLoadingScreen',['$ionicLoading',function($ionicLoading) {
    return function() {
        $ionicLoading.show({
            template: 'Loading...'
        });
    };
}])
.directive('stopLoadingScreen',['$ionicLoading',function($ionicLoading) {
    return function() {
        $ionicLoading.hide();
    };
}]);

