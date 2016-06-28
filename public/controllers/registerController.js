(function ()
{
    'use strict';
    angular.module('loginApp')
        .controller('registerController',registerControllerFn);
    registerControllerFn.$inject = ['$scope','$http','$rootScope'];
    function registerControllerFn($scope,$http,$rootScope)
    {

        $scope.register = function (user)
        {
            // validation at the client-side post only when passwords are same
            if (user.password == user.confirmPassword)
            {
                $http.post('/register', user)
                    .success(function (response)
                    {
                        $rootScope.currentUser = user;
                        console.log(response);
                        alert(user.username + " have been successfully registered ");
                        user = " ";

                    });
            }
        }

    }

})();