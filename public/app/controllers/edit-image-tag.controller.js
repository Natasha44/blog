angular.module('editImageTag.controller', [])
.controller('editImageTagController', function($scope, $http, $location, $routeParams){
   function getImageTagById() {
        $http.get('/api/image-tags/' + $routeParams.id)
        .success(function(data){
            $scope.imageTag = data[0];  
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    getImageTagById();
    
    $scope.saveChanges = function(imageTag){
        
        var updatedImageTag = {
            name: imageTag.name,
            id: $routeParams.id
        };
        
        $http.put('/api/image-tags/' + updatedImageTag.id, updatedImageTag)
        .success(function(data){
            $location.path('/image-tags');
        })
        .error(function(data){
            
        });
    }
});