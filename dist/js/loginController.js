nerdApp.controller('loginController', function($scope, $http, global, $state) {
	$scope.selecteduser;
	console.log("loginController");

	$scope.login = function() {
		if ($scope.selecteduser) {
			console.log($scope.selecteduser);
			global.user = $scope.selecteduser;
			console.log(global.user);
			localStorage.setItem('user',global.user);
			$state.go('dashboard');
		} else {
			alert("Wähle deinen Namen, bitch !");
		}
	}
});
