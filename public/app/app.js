var mvApp=angular.module('mvApp',['ngResource','ngRoute'])

mvApp.config(function($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/',{templateUrl:'/partials/main/main', controller:'mvMainCtrl'})
    .when('/admin/users', {templateUrl:'/partials/admin/user-list',controller:'mvUserListCtrl'})
})



