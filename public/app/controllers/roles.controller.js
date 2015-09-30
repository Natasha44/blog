angular.module('roles.controller', [])
.controller('rolesController', function($scope, $http){

    $http.get('/api/roles')
    .success(function(data){
        $scope.roles = data;  
    })
    .error(function(data){
        
    })
    
    $scope.addRole = function(){
        var newRole = {
            name: $scope.name
        }
        
        $http.post('/api/roles', newRole)
        .success(function(data){
            console.log(data);
        })
        .error(function(data){
            console.log("error");
        })
    
    }
});