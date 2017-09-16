/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
SkyeApp.directive('ngSpinnerBar', ['$rootScope', '$state',
    function($rootScope, $state) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function(event) {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setAngularJsSidebarMenuActiveLink('match', null, event.currentScope.$state); // activate selected link in the sidebar menu
                   
                    // auto scorll to page top
                    setTimeout(function () {
                        App.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);     
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

// Handle global LINK click
SkyeApp.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// // Handle Dropdown Hover Plugin Integration
// SkyeApp.directive('dropdownMenuHover', function () {
//   return {
//     link: function (scope, elem) {
//       elem.dropdownHover();
//     }
//   };  
// });

// // Handle 
// SkyeApp.directive('countUp', ['$compile',function($compile,$timeout) {
//     return {
//         restrict: 'E',
//         replace: false,
//         scope: {
//             countTo: "=countTo",
//             interval: '=interval',
//             speed: '=speed'
//         },
//         controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
//             $scope.millis = 0;
//             if ($element.html().trim().length === 0) {
//                 $element.append($compile('<span>{{millis}}</span>')($scope));
//             } else {
//                 $element.append($compile($element.contents())($scope));
//             }

//             var i=0;
//             function timeloop () {
//                 $timeout(function () {
//                     $scope.millis++;
//                     $scope.$digest();
//                     i++;
//                     if (i<$scope.countTo) {
//                         timeloop();
//                     }
//                 }, $scope.interval, $scope.speed)
//             }
//             timeloop();
//         }]
//     }}]);

// SkyeApp.directive('hellopWorld', function() {
//   return {
//     restrict: 'AE',
//     replace: true,
//     template: '<p style="background-color:{{color}}">Hello World',
//     link: function(scope, elem, attrs) {
//       elem.bind('click', function() {
//         elem.css('background-color', 'white');
//         scope.$apply(function() {
//           scope.color = "white";
//         });
//       });
//       elem.bind('mouseover', function() {
//         elem.css('cursor', 'pointer');
//       });
//     }
//   };
// });

// SkyeApp.directive('helloWorld', function () {
//     return {
//     restrict: 'AE',
//     replace: true,
//     template: '<p style="background-color:{{color}}">Hello World',
//     link: function(scope, elem, attrs) {
//       elem.bind('click', function() {
//         elem.css('background-color', 'white');
//         scope.$apply(function() {
//           scope.color = "white";
//         });
//       });
//       elem.bind('mouseover', function() {
//         elem.css('cursor', 'pointer');
//       });
//     }
//   };
// });

// SkyeApp.directive('fileModel',['$parse',function($parse){
//     return{
//        restrict: 'A',
//        link: function(scope,element,attrs){
//          var model = $parse(attrs.fileModel);
//          var modelSetter = model.assign;

//          element.bind('change',function(){
//             scope.$apply(function(){
//                 modelSetter(scope,element[0].files[0]);
//             });
//          });
//        }
//     };
// }]);
