angular.module('roles.controller', [])
.controller('rolesController', function($scope, $http, $location){

    function getRoles() {
        $http.get('/api/roles')
        .success(function(data){
            $scope.roles = data;  
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    getRoles();
    
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
    
    $scope.deleteRole = function(id) {     
  
        $http.delete('/api/role/' + id)
        .success(function(data){
            getRoles();
        })
        .error(function(data){
            
        });
    }
    
    $scope.saveChanges = function(role){
        console.log(role);
    }
});