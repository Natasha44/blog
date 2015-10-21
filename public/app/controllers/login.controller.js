angular.module('login.controller', [])
.controller('loginController', function($scope, $http){
	
	$scope.login = function(){
		var user = {
			username: $scope.username,
			password: $scope.password
		}
	
		$http.post('/api/login', user)
		.success(function(){
			console.log("ayyyyy");
		})
		.error(function(err){
			console.log(err);	
		});
	}
	
	
});