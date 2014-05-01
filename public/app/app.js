angular.module('mvApp',['ngResource','ngRoute'])

angular.module('mvApp').config(function($routeProvider, $locationProvider){
  var routeRoleChecks={
    admin:{auth:function(mvAuth){
        return mvAuth.authoriseCurrentUserForRoute('admin');
      }
    }
  }

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/',{templateUrl:'/partials/main/main', controller:'mvMainCtrl'})
    .when('/admin/users', {templateUrl:'/partials/admin/user-list',
      controller:'mvUserListCtrl',resolve: routeRoleChecks.admin

    })
    .when('/signup',{templateUrl:'/partials/account/signup',
      controller:'mvSignUpCtrl'})
});

angular.module('mvApp').run(function($rootScope,$location){
  $rootScope.$on('$routeChangeError',function(evt,current,previous,rejection){
    if(rejection==='not authorised') {
      $location.path('/');
    }
  });
})



