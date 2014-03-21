var mvApp=angular.module('mvApp',['ngResource','ngRoute'])

mvApp.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.when('/',{templateUrl:'/partials/main', controller:'mainCtrl'})
})

mvApp.controller('mainCtrl', ['$scope',function($scope){
    $scope.myVar='Mike Blom';
}])

