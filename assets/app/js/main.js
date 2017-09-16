/***
 App Main Script
***/

/* Metronic App */
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



angular.module('SkyeApp')
    .factory('Main',['$http','$localStorage',function($http,$localStorage){
        var baseUrl = "http:127.0.0.1:8123/";

        return{
    
        };

    }]);

/* Setup App Main Controller */
SkyeApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        //App.initComponents(); // init core components 
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 

    });

    io.socket.get('/signin', function(user){
        $scope.x = user;
        $scope.$apply();
    });
    
    io.socket.on('signin', function(event){
        switch (event.verb) {
          case 'created':
            $scope.x.push(event.user);
            $scope.$apply();
            break;
        }
    });


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
SkyeApp.controller('LeftSidebarController', ['$state', '$scope', function($state, $scope) {
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

                            'js/controllers/DashboardController.js',

                            // '../plugins/bower_components/dropify/dist/css/dropify.min.css',
                            // '../plugins/bower_components/dropify/dist/js/dropify.min.js',
                            // '../plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.js',
                            // '../plugins/bower_components/jquery/dist/jquery.min.js',
                            // '../plugins/bower_components/moment/moment.js'                           
                             // '../assets/js/widget.js'
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

                            'js/controllers/BlankController.js'
                        ] 
                    });
                }]
            }
        })

        // // My Business Page
        // .state('my_businesses', {
        //     url: "/my_businesses",
        //     templateUrl: "views/my_businesses.html",            
        //     data: {pageTitle: 'My Business'},
        //     controller: "BlankController",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'SkyeApp',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [

        //                     'js/controllers/BlankController.js'
        //                 ] 
        //             });
        //         }]
        //     }
        // })

        //  // My Business Page
        // .state('my_events', {
        //     url: "/my_events",
        //     templateUrl: "views/my_events.html",            
        //     data: {pageTitle: 'My Events'},
        //     controller: "BlankController",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'SkyeApp',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [

        //                     'js/controllers/BlankController.js'

        //                 ] 
        //             });
        //         }]
        //     }
        // })


        //  // Working Hours Page
        // .state('working_hours', {
        //     url: "/working_hours",
        //     templateUrl: "views/working_hours.html",            
        //     data: {pageTitle: 'Working Hours'},
        //     controller: "BlankController",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'SkyeApp',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [

        //                     'js/controllers/BlankController.js',


        //                     '../plugins/bower_components/clockpicker/dist/jquery-clockpicker.min.css',
        //                     '../plugins/bower_components/timepicker/bootstrap-timepicker.min.css',
        //                     '../plugins/bower_components/switchery/dist/switchery.min.css',

        //                     '../plugins/bower_components/moment/moment.js',                               
        //                     '../plugins/bower_components/clockpicker/dist/jquery-clockpicker.min.js',
        //                     '../plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
        //                     '../plugins/bower_components/timepicker/bootstrap-timepicker.min.js',
        //                     '../plugins/bower_components/switchery/dist/switchery.min.js'
        //                 ] 
        //             });
        //         }]
        //     }
        // })

        //  // Posts Page
        // .state('my_posts', {
        //     url: "/my_posts",
        //     templateUrl: "views/my_posts.html",            
        //     data: {pageTitle: 'My Posts'},
        //     controller: "BlankController",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'SkyeApp',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [

        //                     'js/controllers/BlankController.js',
        //                     '../assets/js/footable-init.js',
        //                     '../plugins/bower_components/footable/css/footable.core.css',
        //                     '../plugins/bower_components/summernote/dist/summernote.css',

        //                     './plugins/bower_components/footable/js/footable.all.min.js',
        //                     '../plugins/bower_components/bootstrap-select/bootstrap-select.min.js',
        //                     '../plugins/bower_components/summernote/dist/summernote.min.js'
        //                 ] 
        //             });
        //         }]
        //     }
        // })

        //  // Keywords Page
        // .state('keywords', {
        //     url: "/keywords",
        //     templateUrl: "views/keywords.html",            
        //     data: {pageTitle: 'Keywords'},
        //     controller: "BlankController",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'SkyeApp',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [

        //                     'js/controllers/BlankController.js',

        //                 ] 
        //             });
        //         }]
        //     }
        // })

        // // Payment Methods Page
        // .state('payment_methods', {
        //     url: "/payment_methods",
        //     templateUrl: "views/payment_methods.html",            
        //     data: {pageTitle: 'Payment Methods'},
        //     controller: "BlankController",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'SkyeApp',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [

        //                     'js/controllers/BlankController.js',

        //                 ] 
        //             });
        //         }]
        //     }
        // })

        // // Social Media Page
        // .state('social_media', {
        //     url: "/social_media",
        //     templateUrl: "views/social_media.html",            
        //     data: {pageTitle: 'Social Media'},
        //     controller: "BlankController",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'SkyeApp',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [

        //                     'js/controllers/BlankController.js',

        //                 ] 
        //             });
        //         }]
        //     }
        // })

        // // FAQs Page
        // .state('help', {
        //     url: "/help",
        //     templateUrl: "views/help.html",            
        //     data: {pageTitle: 'Frequently Asked Questions'},
        //     controller: "BlankController",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'SkyeApp',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [

        //                     'js/controllers/BlankController.js',

        //                 ] 
        //             });
        //         }]
        //     }
        // })

        // //Contact Page
        // .state('contact_details', {
        //     url: "/contact_details",
        //     templateUrl: "views/contacts.html",            
        //     data: {pageTitle: 'Contact Details'},
        //     controller: "BlankController",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'SkyeApp',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [

        //                     'js/controllers/BlankController.js',
        //                     '../assets/js/mask.js',
        //                     '../assets/js/jasny-bootstrap.js'
        //                 ] 
        //             });
        //         }]
        //     }
        // })



       
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