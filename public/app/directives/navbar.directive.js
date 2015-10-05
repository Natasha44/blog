angular.module('navbar.directive', [])
.directive('navbar', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/navbar.html',
        controller: 'navbarController'
    };
});