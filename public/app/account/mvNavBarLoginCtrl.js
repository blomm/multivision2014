angular.module('mvApp').controller('mvNavBarLoginCtrl', ['$scope','$location','mvNotifier','mvIdentity','mvAuth',function($scope,$location,mvNotifier,mvIdentity,mvAuth){
  $scope.identity = mvIdentity;
  $scope.signin=function(username,password){
    console.log("username: "+username);
    console.log("password: "+password);
    mvAuth.authenticateUser(username, password).then(function(authenticated){
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
      $scope.username="";
      $scope.password="";
      mvNotifier.notify("Sign out successful")
      $location.path('/');
    })
  };
}])
