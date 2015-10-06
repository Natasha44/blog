angular.module('blogTags.controller', [])
.controller('blogTagsController', function($scope, $http, $location, $routeParams){
    
    function getBlogTags() {
        $http.get('/api/blog-tags')
        .success(function(data){
            $scope.blogTags = data;  
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    getBlogTags();
    
    $scope.addBlogTag = function(){
        var newBlogTag = {
            name: $scope.blogTag.name
        }
        
        $http.post('/api/blog-tags', newBlogTag)
        .success(function(data){
            $location.path('/blog-tags');
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    $scope.deleteBlogTag = function(id) {     
  
        $http.delete('/api/blog-tags/' + id)
        .success(function(data){
            getBlogTags();
        })
        .error(function(data){
            
        });
    }
    
    $scope.saveChanges = function(blogTag){
        
        var updatedBlogTag = {
            name: blogTag.name,
            id: $routeParams.id
        };
       
        $http.put('/api/blog-tags/' + updatedBlogTag.id, updatedBlogTag)
        .success(function(data){
            $location.path('/blog-tags');
        })
        .error(function(data){
            
        });
    }
});