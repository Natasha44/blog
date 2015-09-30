angular.module('app', [
        'home',
        'blogs',
        'roles',
        'navbar',
        'ngRoute'
    ])
    .config(function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: 'app/templates/home.html',
            controller: 'homeController'
        })
        .when('/blogs', {
            templateUrl: 'app/templates/blogs.html',
            controller: 'blogsController'
        })
        .when('/roles', {
            templateUrl: 'app/templates/roles.html',
            controller: 'rolesController'
        })
        .when('/oops', {
            templateUrl: 'app/templates/oops.html'
        })
        .otherwise({
            redirectTo: '/oops'
        })
    });
