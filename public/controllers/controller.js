var myapp = angular.module('myapp',['ngStorage']);

myapp.config(function($routeProvider){
	$routeProvider
	.when('/Home',{
		resolve: {
			"check" : function($rootScope){
				if(!$rootScope.loggedIn){
					window.location('/LogIn.html');
				}

				
			}
		},
		templateUrl: '/Home.html';
	})

});

myapp.controller('AppCtrl',['$scope','$http','$localStorage','$rootScope','$location',function($scope,$http,$localStorage,$rootScope,$location){
	var refresh = function(){
		$scope.contact = {};
		$scope.data = [];
		$http.get('/forms/Home'+ $localStorage.user).then(function(response){
			$scope.data = response.data;
			// $rootScope.sdasda = response;

		});
	};
	refresh();
	$scope.SignUp = function(){
		$http.post('/forms/forms',$scope.contact).then(function(response){
			$scope.data.push($scope.contact);
			$scope.contact = {};
			window.location = "/Home.html";
		});
			

	};
	$scope.LogIn = function(){
		console.log($scope.contact,"sihishishsfihsfihi")
	 	$http.post('/forms/login',$scope.contact).then(function(response){
		
		
		if(response.status == 200){
			console.log("response",response);
			$scope.user_ID = response.data[0].ID;
			 $localStorage.user = $scope.user_ID; 
			console.log($scope.user_ID);
			$rootScope.loggedIn = true;
			window.location = "/Home.html";

		};
		if(response.status == 202){
			alert("you entered invalid password");
		};


	 	});		
	};
	
	$scope.Post = function(){
		$http.post('/forms/post',{post: $scope.contact,id: $localStorage.user}).then(function(response){
			$scope.data.push($scope.contact);
			$scope.contact = {};

			if(response.status == 203){
			alert("your post uploaded successfully");
		};
		});
	};
	$scope.redirect = function(){
		window.location = "/LogIn.html";
	}


}]);

