(function ()
{
    'use strict';
    angular.module('loginApp')
        .controller('homeController',homeControllerFn);
    homeControllerFn.$inject=['$scope','$http'];
    function homeControllerFn($scope,$http) {

                $scope.$watch('search', function()
                {
                    fetch();

                });
                $scope.search = "Inception";
                function fetch()
                {
                    $http.get("http://www.omdbapi.com/?t=" + $scope.search + "&tomatoes=true&plot=full")
                        .then(function(response)
                        { console.log(response)
                            $scope.details = response.data; });

                }
                $scope.update = function(movie){
                    $scope.search = movie.Title;
                };
                $scope.select = function() {
                    this.setSelectionRange(0, this.value.length);
                }
            }




})();