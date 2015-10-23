angular.module('blogs.controller', ['angularjs-dropdown-multiselect'])
.controller('blogsController', function($scope, $http, $location, $routeParams){
    
    $scope.tags = [];
    $scope.selectedTags = [];
    $scope.selectedUser;
    
    function getUsers(){
        $http.get('/api/users')
        .success(function(data) {
            $scope.users = data;
            $scope.selectedUser = $scope.users[0];
        }).
        error(function(data) {
            console.log("error");
        });
    }
    
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

    getBlogs();
    getBlogTags();
    getUsers();
    
    $scope.tagSettings = {
        smartButtonMaxItems: 3,
        smartButtonTextConverter: function(itemText, originalItem) {    
            return itemText;
        }
    };
    
    $scope.dropboxitemselected = function (user) {
        $scope.selectedUser.first_name = user.first_name;
        $scope.selectedUser.id = user.id;
    };

    $scope.addBlog = function() {
        var tag = [];
        for(var i = 0; i < $scope.selectedTags.length; i++){
            if($scope.selectedTags.length !== undefined){
                tag.push($scope.selectedTags[i].id);
            }   
        }
         console.log(tag);
        var newBlog = {
            title: $scope.blog.title,
            user_id: $scope.selectedUser.id,
            body: $scope.blog.body,
            last_updated_user_id: $scope.selectedUser.id,
            tags: tag
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
   
});

