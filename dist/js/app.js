var nerdApp = angular.module('nerdApp', ['ui.router']);

nerdApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/");
	$stateProvider
		.state('app', {
			url: "/login",
			templateUrl: "../login.html",
			controller: 'loginController'
		})
		.state('dashboard', {
			url: "/dashboard",
			templateUrl: "../dashboard.html",
			controller: 'mainController'
		});
	console.log("config app");

});

nerdApp.service('global', function() {
	var user;
	console.log("init service");
});
