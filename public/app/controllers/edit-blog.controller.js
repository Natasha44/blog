angular.module('editBlog.controller', [])
.controller('editBlogController', function($scope, $http, $location, $routeParams){
	function getBlogById() {
        $http.get('/api/blogs/' + $routeParams.id)
        .success(function(data){
            $scope.blog = data[0];  
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    getBlogById();
    
    $scope.saveChanges = function(blog){
        var updatedBlog = {
            id: $routeParams.id,
            title: blog.title,
            user_id: 1,
            body: blog.body,
            user_id: 1
        };
        
        $http.put('/api/blogs/' + updatedBlog.id, updatedBlog)
        .success(function(data){
            $location.path('/blogs');
        })
        .error(function(data){
            
        });
    }
});