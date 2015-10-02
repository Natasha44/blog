angular.module('users.controller', [])
.controller('usersController', function($scope, $http, $location) {
    
    function getUsers() {
        $http.get('/api/users')
        .success(function(data){
            $scope.users = data;  
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    getUsers();
    
    $scope.addUser = function(){
        var newUser = {
            first_name: $scope.user.first_name,
            last_name: $scope.user.last_name,
            password_hash: $scope.user.password,
            email: $scope.user.email,
            user_name: $scope.user.user_name,
            role_id: 1
        }
        
        $http.post('/api/users', newUser)
        .success(function(data){
            $location.path('/users');
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    $scope.saveChanges = function(user){
        console.log(user);
    }
});