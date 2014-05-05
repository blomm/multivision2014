angular.module('mvApp').controller('mvNavBarLoginCtrl', ['$scope','$location','mvNotifier','mvIdentity','mvAuth',function($scope,$location,mvNotifier,mvIdentity,mvAuth){
  $scope.identity = mvIdentity;
  $scope.signin=function(userName,password){

    mvAuth.authenticateUser(userName, password).then(function(authenticated){
      if(authenticated){
        mvNotifier.notify("Login successful");
      }
      else{
        mvNotifier.notify("Login failed");
      }

    });

  };
  $scope.signout=function(){
    mvAuth.logoutUser().then(function(){
      $scope.userName="";
      $scope.password="";
      mvNotifier.notify("Sign out successful")
      $location.path('/');
    })
  };
}])
