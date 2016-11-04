nerdApp.controller('mainController', function($scope, $http, global) {

	$scope.days = [];
	$scope.user = global.user;
	console.log("mainController");
	console.log(daysInMonth());

	createDateArray(daysInMonth());

	function daysInMonth() {
		var date = new Date();
		return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
	}

	function createDateArray(count) {
		var date = new Date();

		for (var i = 1; i < count; i++) {
			$scope.days.push({
				id: date.getMonth() + "." + i + "." +
					date.getFullYear(),
				members: ["Alex", "Philipp"]
			})
		}
		console.log($scope.days);
	}

	function contains(a, b) {
		return !!~a.indexOf(b);
	}

	$scope.addToDay = function(day) {
		console.log("Search day");
		console.log(day);
		$scope.days.forEach(function(entry) {
			console.log(entry.id);
			if (entry.id == day.id) {
				if (!contains(entry.members, $scope.user)) {
					entry.members.push($scope.user);
					console.log("add user");
				}
			}
		});
	}

});
