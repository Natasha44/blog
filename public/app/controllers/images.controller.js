angular.module('images.controller', ['angularFileUpload'])
.controller('imagesController', function($scope, $http, $location, $routeParams, FileUploader){
    $scope.uploader = new FileUploader();

    $scope.tags = [];
    $scope.selectedTags = [];

    function getImages() {
        $http.get('/api/images')
        .success(function(data){
            $scope.images = data;
            for(var i = 0; i < $scope.images.length; i++){
                var upload_date = new Date($scope.images[i].upload_date);
                $scope.images[i].upload_date = upload_date.toDateString() + ' ' + upload_date.toLocaleTimeString();
            }
        })
        .error(function(data){
            console.log("error");
        });
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
    
    getImages();
    getImageTags();
    
    $scope.tagSettings = {
        smartButtonMaxItems: 3,
        smartButtonTextConverter: function(itemText, originalItem) {    
            return itemText;
        }
    };
    
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