angular.module('editBlog.controller', [])
.controller('editBlogController', function($scope, $http, $location, $routeParams){
	
    $scope.tags = [];
    $scope.selectedTags = [];
    
    function getBlogById() {
        $http.get('/api/blogs/' + $routeParams.id)
        .success(function(data){
            $scope.blog = data[0];  
        })
        .error(function(data){
            console.log("error");
        })
    }
    
    function getBlogTags(){
        $http.get('/api/blog-tags')
        .success(function(data){
            $scope.blogTags = data;
            var i;
            for (i = 0; i < $scope.blogTags.length; i++) {
                $scope.blogTag = {}; 
                $scope.blogTag.id = $scope.blogTags[i].id;
                $scope.blogTag.label = $scope.blogTags[i].name;
                $scope.tags.push($scope.blogTag);  
            }
        })
        .error(function(data){
            console.log("error");
        })
    }
        
    function getBlogBlogTags() {
        $http.get('/api/blog-blog-tags/' + $routeParams.id)
        .success(function(data) {
            $scope.tags = data[0].blog_tag_id;
        }).
        error(function(data) {
            console.log("error");
        });
    }
    
    getBlogBlogTags();
    getBlogTags();
    getBlogById();
    
    
    $scope.tagSettings = {
        smartButtonMaxItems: 3,
        smartButtonTextConverter: function(itemText, originalItem) {    
            return itemText;
        }
    };
    
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