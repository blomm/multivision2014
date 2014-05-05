angular.module('mvApp').controller('mvProfileCtrl',['$scope','mvIdentity','mvAuth','mvNotifier',function($scope,mvIdentity,mvAuth,mvNotifier){


  $scope.userName=mvIdentity.currentUser.userName;
  $scope.fname=mvIdentity.currentUser.firstName;
  $scope.lname=mvIdentity.currentUser.lastName;
  $scope.email=mvIdentity.currentUser.email;

  $scope.update=function(){
    var newUserData={
      email:$scope.email,
      userName:$scope.userName,
      firstName:$scope.fname,
      lastName:$scope.lname
    }
    if($scope.password && $scope.password.length>0){
      newUserData.password=$scope.password;
    }

    mvAuth.updateCurrentUser(newUserData).then(function(){
      mvNotifier.notify('Your account has been updated');
      },function(reason){
        mvNotifier.error(reason);
    })
  }
}])