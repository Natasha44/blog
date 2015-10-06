angular.module('editUser.controller', [])
.controller('editUserController', function($scope, $http, $location, $routeParams){
   function getUserById() {
        $http.get('/api/users/' + $routeParams.id)
        .success(function(data){
            $scope.user = data[0];  
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    getUserById();
    
    $scope.saveChanges = function(user){
        var updatedUser = {
            id: $routeParams.id,
            first_name: user.first_name,
            last_name: user.last_name,
            password_hash: user.password_hash,
            email: user.email,
            user_name: user.user_name,
            role_id: 1
        }
        
        $http.put('/api/users/' + updatedUser.id, updatedUser)
        .success(function(data){
            $location.path('/users');
        })
        .error(function(data){
            
        });
    }
    
});