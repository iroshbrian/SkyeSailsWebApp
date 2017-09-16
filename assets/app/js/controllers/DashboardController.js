/* Setup blank page controller */
angular.module('SkyeApp').controller('DashboardController', ['$rootScope', '$scope' function($rootScope, $scope) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        // App.initAjax();

            $scope.date = new Date();
    });


    io.socket.post('/business/user/' + $scope.id, function(data)){
    	$scope.businesses = data;
    	$scope.$apply();
    });
	
	io.socket.on('business/user/' + $scope.id, function(event)){
		swith (event.verb) {
		  case 'created':
		  	$scope.businesses.push(event.data);
		  	$scope.$apply();
		  	break;
		}
	});

	$scope.businesses=[];
	$http.get("http://localhost:8123//business/user/" + $scope.id)
		.success(function(data){
	 		$scope.businesses=data;
	 		$log.info($scope.businesses);
		});

}]);



