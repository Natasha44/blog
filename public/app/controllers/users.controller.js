angular.module('users.controller', [])
.controller('usersController', function($scope, $http, $location, $routeParams) {
    
    function getUsers() {
        $http.get('/api/users')
        .success(function(data){
            $scope.users = data;  
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    function getRoles() {
        $http.get('/api/roles')
        .success(function(data){
            $scope.roles = data;
            $scope.selectedRole = $scope.roles[0];
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    getUsers();
    getRoles();
    
    $scope.dropboxitemselected = function (role) {
        $scope.selectedRole.name = role.name;
        $scope.selectedRole.id = role.id;
    };
        
    $scope.addUser = function(){
        var newUser = {
            first_name: $scope.user.first_name,
            last_name: $scope.user.last_name,
            password_hash: $scope.user.password,
            email: $scope.user.email,
            user_name: $scope.user.user_name,
            role_id: $scope.selectedRole.id
        }
        
        $http.post('/api/users', newUser)
        .success(function(data){
            $location.path('/users');
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    $scope.deleteUser = function(id) {     
  
        $http.delete('/api/users/' + id)
        .success(function(data){
            getUsers();
        })
        .error(function(data){
            
        });
    }
    
});