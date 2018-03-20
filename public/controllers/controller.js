var myapp = angular.module('myapp',[]);

myapp.controller('AppCtrl',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	var refresh = function(){
		$scope.contact = {};
		$scope.data = [];
		$http.get('/forms').then(function(response){
			$scope.data = response.data;
			// $rootScope.sdasda = response;

		});
	};
	refresh();
	$scope.addContact = function(){
		$http.post('/forms/forms',$scope.contact).then(function(response){
			$scope.data.push($scope.contact);
			$scope.contact = {};
		});
			// console.log($scope.crud);

	};

	$scope.remove = function(id){
		console.log(id);
		$http.delete('/forms/forms/' + id);
		refresh();

	};
	$scope.edit = function(contact){
	// 	$http.get('/forms/forms/'+ id).then(function(response){
			$scope.contact=contact;
	// 	});

	};
	$scope.update = function(){
		console.log($scope.contact.ID);
		$http.put('/forms/forms/' + $scope.contact.ID,$scope.contact).success(function(response){
			refresh();
		});
	};


}]);

// myapp.controller('myCtrl', function($scope) {
//     $scope.carname = "Volvo";
//     console.log('asdasda');
// });