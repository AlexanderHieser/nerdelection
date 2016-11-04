nerdApp.controller('mainController', function($scope, $http, global) {

    $scope.days = [];
    $scope.user = global.user;
    $scope.user = localStorage.getItem('user');
    $scope.month = [];

		$scope.possible = daysInMonth();
		$scope.played = "0";
		$scope.mvp = "Alex, wer sonst";
    Date.prototype.getWeekDay = function() {
        var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekday[this.getDay()];
    }

    $http.get('/app/month').then(function sucks(response) {
        console.log(response.data);
        $scope.month = response.data;
        $scope.days = $scope.month.days;
    }, function onError(response) {
				console.log("error"+ response);
    });



    function daysInMonth() {
        var date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    }

    function createDateArray(count) {
        var date = new Date();

        for (var i = 1; i < count; i++) {
            $scope.days.push({
                id: i + "." + date.getMonth() + "." +
                    date.getFullYear(),
                day: new Date(date.getFullYear(), date.getMonth(), i).getWeekDay(),
                members: []
            })
        }
        console.log($scope.days);
    }

    function contains(a, b) {
        return !!~a.indexOf(b);
    }



    $scope.addToDay = function(day) {
        console.log("Search day");
        $scope.days.forEach(function(entry) {
            if (entry.id == day.id) {
                if (!contains(entry.members, $scope.user)) {
                    entry.members.push($scope.user);
                } else {
                    var index = entry.members.indexOf($scope.user);
                    entry.members.splice(index, 1);
                }
								updateDay(day);
            }
        });
    }

		function updateDay(day) {
			var json = {
				id:day.id,
				date:day.date,
				members:day.members
			}
			console.log(json);
			$http.post('app/update',json).then(function success(response) {
				console.log(response);
			}, function error(response) {
				console.log(response);
			})
		}


});
