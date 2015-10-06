angular.module('editRole.controller', [])
.controller('editRoleController', function($scope, $http, $location, $routeParams){
   function getRoleById() {
        $http.get('/api/roles/' + $routeParams.id)
        .success(function(data){
            $scope.role = data[0];  
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    getRoleById();
    
    $scope.saveChanges = function(role){
        var updatedRole = {
            name: role.name,
            id: $routeParams.id
        };
        
        $http.put('/api/roles/' + updatedRole.id, updatedRole)
        .success(function(data){
            $location.path('/roles');
        })
        .error(function(data){
            console.log("error");
        });
    }
});