angular.module('app', [
        'home',
        'blogs',
        'roles',
        'navbar',
        'users',
        'blogTags',
        'imageTags',
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
        .when('/add-blog', {
            templateUrl: 'app/templates/add-blog.html',
            controller: 'blogsController'
        })
        .when('/edit-blog/:id', {
            templateUrl: 'app/templates/edit-blog.html',
            controller: 'blogsController'
        })
        .when('/roles', {
            templateUrl: 'app/templates/roles.html',
            controller: 'rolesController'
        })
        .when('/add-role', {
            templateUrl: 'app/templates/add-role.html',
            controller: 'rolesController'
        })
        .when('/edit-role/:id', {
            templateUrl: 'app/templates/edit-role.html',
            controller: 'rolesController'
        })
        .when('/users', {
            templateUrl: 'app/templates/users.html',
            controller: 'usersController'
        })
        .when('/add-user', {
            templateUrl: 'app/templates/add-user.html',
            controller: 'usersController'
        })
        .when('/edit-user/:id', {
            templateUrl: 'app/templates/edit-user.html',
            controller: 'usersController'
        })
        .when('/blog-tags', {
            templateUrl: 'app/templates/blog-tags.html',
            controller: 'blogTagsController'
        })
        .when('/add-blog-tag', {
            templateUrl: 'app/templates/add-blog-tag.html',
            controller: 'blogTagsController'
        })
        .when('/edit-blog-tag/:id', {
            templateUrl: 'app/templates/edit-blog-tag.html',
            controller: 'blogTagsController'
        })
        .when('/image-tags', {
            templateUrl: 'app/templates/image-tags.html',
            controller: 'imageTagsController'
        })
        .when('/add-image-tag', {
            templateUrl: 'app/templates/add-image-tag.html',
            controller: 'imageTagsController'
        })
        .when('/edit-image-tag/:id', {
            templateUrl: 'app/templates/edit-image-tag.html',
            controller: 'imageTagsController'
        })
        .when('/oops', {
            templateUrl: 'app/templates/oops.html'
        })
        .otherwise({
            redirectTo: '/oops'
        })
    });
