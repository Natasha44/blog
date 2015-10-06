angular.module('blogs.controller', [])
.controller('blogsController', function($scope, $http, $location, $routeParams){
    
    function getBlogs() {
        $http.get('/api/blogs')
        .success(function(data) { 
            $scope.blogs = data;
            for(var i=0; i < $scope.blogs.length; i++){
                var date_created = new Date($scope.blogs[i].date_created),
                    date_published = new Date($scope.blogs[i].date_published),
                    last_updated = new Date($scope.blogs[i].last_updated);
                $scope.date_published = $scope.blogs[i].date_published;
                    $scope.blogs[i].date_created = date_created.toDateString() + ' ' + date_created.toLocaleTimeString();
                    $scope.blogs[i].last_updated = last_updated.toDateString() + ' ' + last_updated.toLocaleTimeString();
                    if (date_published != null){
                        $scope.blogs[i].date_published = date_published.toDateString() + ' ' + date_published.toLocaleTimeString();
                    }
                }
        }).
        error(function(data) {

        });
    }
    
    getBlogs();
    
    $scope.addBlog = function() {
        var newBlog = {
            title: $scope.blog.title,
            user_id: 1,
            body: $scope.blog.body,
            user_id: 1
        };
        
        $http.post('/api/blogs', newBlog)
        .success(function(data) {
            $location.path('/blogs');
        }).
        error(function(data) {
            console.log("error");
        });
    }
    
    $scope.deleteBlog = function(id) {     
  
        $http.delete('/api/blogs/' + id)
        .success(function(data){
            getBlogs();
        })
        .error(function(data){
            
        });
    }
    
    $scope.saveChanges = function(blog){
        var updatedBlog = {
            id: $routeParams.id,
            title: blog.title,
            user_id: 1,
            body: blog.body,
            user_id: 1
        };
        
        console.log(updatedBlog);
        $http.put('/api/blogs/' + updatedBlog.id, updatedBlog)
        .success(function(data){
            $location.path('/blogs');
        })
        .error(function(data){
            
        });
    }
});

