angular.module('blogs.controller', [])
.controller('blogsController', function($scope, $http){
    
    $http.get('/api/blogs')
    .success(function(data) {       
        $scope.blogs = data;
    }).
    error(function(data) {
        
    });
    
    $scope.addBlog = function() {
        var newBlog = {
            title: $scope.title,
            user_id: 1,
            body: $scope.body,
            user_id: 1
        };
        
        $http.post('/api/blogs', newBlog)
        .success(function(data) {       
            
        }).
        error(function(data) {
            console.log("error");
        });
    }
});

