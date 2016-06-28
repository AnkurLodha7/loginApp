(function () {
    'use strict';
    angular.module('loginApp')
        .controller('loginController',loginControllerFn);
    loginControllerFn.$inject = ['$scope','$http','$rootScope','$location'];
    function loginControllerFn($scope,$http,$rootScope,$location)
    {
        $scope.login = function (user)
        {
            $http.post('/login',user)
                .success(function (user) {
                   console.log(user);
                    alert(user.firstname + " welcome back");
                    $rootScope.currentUser = user;
                    $location.url("/profile");

                });

        }
    }
})
();