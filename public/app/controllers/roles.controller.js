angular.module('roles.controller', [])
.controller('rolesController', function($scope, $http, $location){

    function getRole() {
        $http.get('/api/roles')
        .success(function(data){
            $scope.roles = data;  
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    getRole();
    
    $scope.addRole = function(){
        var newRole = {
            name: $scope.role.name
        }
        
        $http.post('/api/roles', newRole)
        .success(function(data){
            $location.path('/roles');
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    $scope.saveChanges = function(role){
        console.log(role);
    }
});