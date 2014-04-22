angular.module('mvApp').controller('mvSignUpCtrl',['$scope','$location','mvAuth','mvNotifier',function($scope,$location,mvAuth,mvNotifier){

  $scope.signup=function(){
    var newUserData={
      username:$scope.email,
      password:$scope.password,
      firstName:$scope.fname,
      lastName:$scope.lname
      };

    mvAuth.createUser(newUserData).then(function(){
      mvNotifier.notify('User Account Created.');
      $location.path('/');
    },function(reason){
      mvNotifier.error(reason);
    })
  }

}])