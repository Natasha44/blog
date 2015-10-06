angular.module('editBlogTag.controller', [])
.controller('editBlogTagController', function($scope, $http, $location, $routeParams){
    
   function getBlogTagById() {
        $http.get('/api/blog-tags/' + $routeParams.id)
        .success(function(data){
            $scope.blogTag = data[0];  
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    getBlogTagById();
    
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