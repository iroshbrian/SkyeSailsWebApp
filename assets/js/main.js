/***
 App Main Script
***/

/* Skye App */
var SkyeApp = angular.module("SkyeApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    'ngStorage'
]); 



/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
SkyeApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
SkyeApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/


/* Setup App Main Controller */
SkyeApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        //App.initComponents(); // init core components 
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 

    });

    // io.socket.get('/signin', function(user){
    //     $scope.x = user;
    //     $scope.$apply();
    // });
    
    // io.socket.on('signin', function(event){
    //     switch (event.verb) {
    //       case 'created':
    //         $scope.x.push(event.user);
    //         $scope.$apply();
    //         break;
    //     }
    // });


}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
SkyeApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
SkyeApp.controller('SidebarController', ['$state', '$scope', function($state, $scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar($state); // init sidebar
    });
}]);


/* Setup Layout Part - Footer */
SkyeApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);


       


/* Setup Rounting For All Pages */
SkyeApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard");  

    $stateProvider

        // Dashboard
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "/templates/dashboard.html",            
            data: {pageTitle: 'Client Dashboard'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'SkyeApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [

                            '../app/js/controllers/DashboardController.js',

                          
                        ] 
                    });
                }]
            }
        })

        // Blank Page
        .state('blank', {
            url: "/blank",
            templateUrl: "/templates/blank.html",            
            data: {pageTitle: 'Blank Page Template'},
            controller: "BlankController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'SkyeApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [

                            '../app/js/controllers/BlankController.js'
                        ] 
                    });
                }]
            }
        })

}]);




/* Init global settings and run the app */
SkyeApp.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    //$rootScope.$settings = settings; // state to be accessed from view
}]);

/*
when ever we need to make a request to the server on the protected routes,the token needs to be out in the authorization header.
angularJS interceptors are used to hijack the request and insert the bearer token to the authorization header field

*/

// $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
//     return {
//         'request': function (config) {
//             config.headers = config.headers || {};
//             if ($localStorage.token) {
//                 config.headers.Authorization = 'Bearer ' + $localStorage.token;
//             }
//             return config;
//         },
//         'responseError': function(response) {
//             if(response.status === 401 || response.status === 403) {
//                 $location.path('/signin');
//             }
//             return $q.reject(response);
//         }
//     };
// }]);