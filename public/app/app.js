angular.module('app', [
        'home',
        'blogs',
        'roles',
        'navbar',
        'users',
        'blogTags',
        'imageTags',
        'editRole',
        'editBlogTag',
        'editBlog',
        'editUser',
        'images',
        'editImage',
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
        .when('/blogs/add', {
            templateUrl: 'app/templates/add-blog.html',
            controller: 'blogsController'
        })
        .when('/blogs/edit/:id', {
            templateUrl: 'app/templates/edit-blog.html',
            controller: 'editBlogController'
        })
        .when('/roles', {
            templateUrl: 'app/templates/roles.html',
            controller: 'rolesController'
        })
        .when('/roles/add', {
            templateUrl: 'app/templates/add-role.html',
            controller: 'rolesController'
        })
        .when('/roles/edit/:id', {
            templateUrl: 'app/templates/edit-role.html',
            controller: 'editRoleController'
        })
        .when('/users', {
            templateUrl: 'app/templates/users.html',
            controller: 'usersController'
        })
        .when('/users/add', {
            templateUrl: 'app/templates/add-user.html',
            controller: 'usersController'
        })
        .when('/users/edit/:id', {
            templateUrl: 'app/templates/edit-user.html',
            controller: 'editUserController'
        })
        .when('/blog-tags', {
            templateUrl: 'app/templates/blog-tags.html',
            controller: 'blogTagsController'
        })
        .when('/blog-tags/add', {
            templateUrl: 'app/templates/add-blog-tag.html',
            controller: 'blogTagsController'
        })
        .when('/blog-tags/edit/:id', {
            templateUrl: 'app/templates/edit-blog-tag.html',
            controller: 'editBlogTagController'
        })
        .when('/image-tags', {
            templateUrl: 'app/templates/image-tags.html',
            controller: 'imageTagsController'
        })
        .when('/image-tags/add', {
            templateUrl: 'app/templates/add-image-tag.html',
            controller: 'imageTagsController'
        })
        .when('/image-tags/edit/:id', {
            templateUrl: 'app/templates/edit-image-tag.html',
            controller: 'imageTagsController'
        })
        .when('/images', {
            templateUrl: 'app/templates/images.html',
            controller: 'imagesController'
        })
        .when('/images/add', {
            templateUrl: 'app/templates/add-images.html',
            controller: 'imagesController'
        })
        .when('/images/edit/:id', {
            templateUrl: 'app/templates/edit-image.html',
            controller: 'editImageController'
        })
        .when('/oops', {
            templateUrl: 'app/templates/oops.html'
        })
        .otherwise({
            redirectTo: '/oops'
        })
    });
