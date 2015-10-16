angular.module('editImage.controller', [])
.controller('editImageController', function($scope, $http, $location, $routeParams){
   
    $scope.tags = [];
    $scope.selectedTags = [];
   
   function getImageById() {
        $http.get('/api/images/' + $routeParams.id)
        .success(function(data){
            $scope.image = data[0];  
        })
        .error(function(data){
            console.log("error");
        })
    }

    function getImageTags(){
        $http.get('/api/image-tags')
        .success(function(data){
            $scope.imageTags = data;
            var i;
            for (i = 0; i < $scope.imageTags.length; i++) {
                $scope.imageTag = {}; 
                $scope.imageTag.id = $scope.imageTags[i].id;
                $scope.imageTag.label = $scope.imageTags[i].name;
                $scope.tags.push($scope.imageTag);  
            }
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    getImageById();
    getImageTags();
    
    $scope.tagSettings = {
        smartButtonMaxItems: 3,
        smartButtonTextConverter: function(itemText, originalItem) {    
            return itemText;
        }
    };
    
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