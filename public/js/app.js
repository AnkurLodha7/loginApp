
(function () {
    angular.module('loginApp',['ngRoute'])
        .config(configFn);
    configFn.$inject=['$routeProvider'];
    function configFn($routeProvider)
    {
        $routeProvider
            .when('/home',
                {
               templateUrl:'views/home.html',
                controller:'homeController',
                // resolve the following in order to access homepage
                //resolve:{
                  //  logincheck: checkloggedin
                //}
            })
            .when('/profile',{
                templateUrl:'views/profile.html',
                controller:'profileController',
                resolve:{
                    profileCheck: checkloggedin
                }
            })
            .when('/register',{
                templateUrl:'views/register.html',
                controller:'registerController',
            })
            .when('/login',{
                templateUrl:'views/login.html',
                controller:'loginController',
            })
            .when('/logout',{
                controller:'logoutController',
            })


            .otherwise({redirectTo:'/home'})
    }
    var checkloggedin = function ($q,$timeout,$http,$location,$rootScope)
    {

        var deferred = $q.defer();

        //make a request to /loggedin which on success will tell whether the user is logged in or not
        //it will respond with actual object of the user or 0
        // if it responds with user object we will set $rootScope.currentUser = user; to set user on rootscope(i.e throughout the application)
        // http is a stateless protocol, every request is a new request, it does not remember previous request
        // to make make it remember we have to maintain some kind of session and therefore we will use cookies
        // browser has to maintain cookie to remember that we are in the same session
        // we need a cookie parser in the server.js to parse cookie and also express module for maintaining session info
        $http.get('/loggedin').success(function (user)
        {
            $rootScope.errorMessage =null;
            // user is authenticated, if user !== 0
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                // it will resolve,you are good to go
                deferred.resolve();
                $location.url('/profile');
            }
            // user is not authenticated, if user == 0
            else
            {
                // if not successfully loggedin redirect to login page
                $rootScope.errorMessage = 'Please Login';
                deferred.reject();
                $location.url('/login');
            }
        });
        return deferred.promise;
    }

})();





