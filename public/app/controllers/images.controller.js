angular.module('images.controller', [])
.controller('imagesController', function($scope, $http, $location, $routeParams){

    function getImages() {
        $http.get('/api/images')
        .success(function(data){
            $scope.images = data;  
        })
        .error(function(data){
            console.log("error");
        });
    }
    
    getImages();
    
    $scope.addImage = function(){
        var newImage = {
            file_path: $scope.image.file_path,
            title: $scope.image.title,
            user_id: $scope.image.user_id
        }
        
        $http.post('/api/images', newImage)
        .success(function(data){
            $location.path('/images');
        })
        .error(function(data){
            console.log("error");
        });
    }
    
    $scope.deleteImage = function(id) {     
        $http.delete('/api/images/' + id)
        .success(function(data){
            getImages();
        })
        .error(function(data){
            console.log("error");
        });
    }

});