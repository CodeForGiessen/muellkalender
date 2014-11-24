'use strict';
angular.module('Muellkalender', [
    'ionic',
    'config',
    'Muellkalender.controller.app',
    'Muellkalender.controller.streets',
    'Muellkalender.controller.street',
    'Muellkalender.controller.dashboard',
    'Muellkalender.controllers',
    'Muellkalender.services',
    'Muellkalender.directives'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent' :{
                templateUrl: 'templates/search.html'
            }
        }
    })
    .state('app.browse', {
        url: '/dashboard',
        views: {
            'menuContent' :{
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardCtrl'
            }
        }
    })
    .state('app.streets', {
        url: '/streets',
        views: {
            'menuContent' :{
                templateUrl: 'templates/streets.html',
                controller: 'StreetsCtrl'
            }
        }
    })

    .state('app.single', {
        url: '/streets/:streetId',
        views: {
            'menuContent' :{
                templateUrl: 'templates/street.html',
                controller: 'StreetCtrl'
            }
        }
    });
    $urlRouterProvider.otherwise('/app/dashboard');
});

