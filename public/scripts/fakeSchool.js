var fakeSchool = angular.module('fakeSchool',['ngResource', 'ngRoute']).run(function($http, $rootScope) {
	$rootScope.loggedin = false;
	$rootScope.current_user = 'Guest';
    $rootScope.page = 'login';
    $rootScope.student = null;
});


fakeSchool.factory('UserFactory',function($resource){
   return $resource('api/master/users');
});

fakeSchool.factory('TodoFactory',function($resource){
   return $resource('api/master/todos');
});

fakeSchool.factory('TeacherFactory',function($resource){
   return $resource('api/master/teachers');
});

fakeSchool.controller('SignUpController',function($scope,$http,$rootScope, $window){
    $scope.username = "";
    $scope.password = "";
    $scope.choice = "";

    $scope.submit = function(){
        console.log('Making request...');
        console.log($scope.choice);
        $http.post('/signup',{
            username: $scope.username,
            password: $scope.password,
            category: $scope.choice}
        )
        .success(function(response) {
            console.log(response.state);
            if (response.state == 'success'){
                $rootScope.loggedin = true;
                $scope.message = "";
                rootScope.current_user = response.user.username;
                $rootScope.page = "home";
                if($rootScope.current_user.category == "student"){
                    $rootScope.page = "student";
                    $rootScope.student = response.user;
                }
            }
            else
                $scope.message = response.message;
        });
        $scope.username = "";
        $scope.password = "";
    }
});


fakeSchool.controller('LoginController',function($scope,$http,$rootScope,$window, UserFactory){
    $scope.username = "";
    $scope.password = "";

    $scope.submit = function(){
        $http.post('/login',{
            username: $scope.username,
            password: $scope.password}
        )
        .success(function(response) {
            if (response.state == 'success'){
                $rootScope.loggedin = true;
                $scope.message = "";
                console.log('Logging in...');
                console.log(response.user.username);
                $rootScope.current_user = response.user.username;
                $rootScope.page = "home";
                console.log($rootScope.current_user.category);
                if(response.user.category == "student")
                    $rootScope.page = "student";
            }
            else
                $scope.message = response.message;
        });
        
        $scope.username = "";
        $scope.password = "";
    }
});

fakeSchool.controller('homeController',function($scope,$http,$rootScope,$window,UserFactory,TodoFactory){
    $scope.username = UserFactory.current_user;

    $scope.users = UserFactory.query();

    $scope.todos = TodoFactory.query();
});

fakeSchool.controller('studentController',function($scope,$http,$rootScope,$window,UserFactory,TodoFactory, TeacherFactory){
    $scope.username = UserFactory.current_user;

    $scope.tados = TodoFactory.query();

    $scope.teachers = TeacherFactory.query();
});



