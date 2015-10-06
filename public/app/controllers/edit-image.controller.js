angular.module('editImage.controller', [])
.controller('editImageController', function($scope, $http, $location, $routeParams){
   function getImageById() {
        $http.get('/api/images/' + $routeParams.id)
        .success(function(data){
            $scope.image = data[0];  
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    getImageById();
    
    $scope.saveChanges = function(image){
        var updatedImage = {
            file_path: image.file_path,
			title: image.title,
            id: $routeParams.id
        };
        
        $http.put('/api/images/' + updatedImage.id, updatedImage)
        .success(function(data){
            $location.path('/images');
        })
        .error(function(data){
            console.log("error");
        });
    }
});