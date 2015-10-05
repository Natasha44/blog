angular.module('imageTags.controller', [])
.controller('imageTagsController', function($scope, $http, $location){
    
    function getImageTags() {
        $http.get('/api/image-tags')
        .success(function(data){
            $scope.imageTags = data;
        })
        .error(function(data){
            
        });
    }
    
    getImageTags();
    
    $scope.addImageTag = function() {
        
        var newImageTag = {
            name: $scope.imageTag.name
        };
        
        $http.post('/api/image-tags', newImageTag)
        .success(function(data){
            $location.path('/image-tags');
        })
        .error(function(data){
            
        });
    }
    
    $scope.deleteImageTag = function(id) {     
  
        $http.delete('/api/image-tags/' + id)
        .success(function(data){
            getImageTags();
        })
        .error(function(data){
            
        });
    }
    
    $scope.saveChanges = function(imageTag){
        console.log(imageTag);
    }
})