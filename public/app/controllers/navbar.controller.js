angular.module('navbar.controller', ['navbar.directive'])
.controller('navbarController', function($scope, $location){    
    $scope.isSelected = function(selected) {
        return selected === $location.path();
    };
});