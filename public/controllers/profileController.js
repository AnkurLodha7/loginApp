(function () {
    'use strict';
    angular.module('loginApp')
        .controller('profileController',profileControllerFn);
    profileControllerFn.$inject =['$http','$scope'];
    function profileControllerFn($http,$scope)
    {
        $http.get("/rest/user")
            .success(function (users) {
                $scope.users = users;
            })
    }
})();
