angular.module('app', [
        'home',
        'ngRoute'
    ])
    .config(function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: 'app/templates/home.html',
            controller: 'homeController'
        })
        .when('/oops', {
            templateUrl: 'app/templates/oops.html'
        })
        .otherwise({
            redirectTo: '/oops'
        })
    });
