(function () {
    'use strict';
    angular.module('loginApp')
        .controller('logoutController',logoutControllerFn);
    logoutControllerFn.$inject=['$scope','$http','$location','$rootScope'];
    function logoutControllerFn ($scope,$http,$location,$rootScope)
    {
        $scope.logout = function ()
        {
                $http.post("/logout")
                    .success(function (response) {
                        console.log(response);
                        $rootScope.currentUser = null;
                        alert("You are Successfully Logged out");
                        $location.url("/home")
                    });
        }
    }





})();