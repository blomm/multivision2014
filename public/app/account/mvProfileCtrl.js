angular.module('mvApp').controller('mvProfileCtrl',['$scope','mvIdentity','mvAuth','mvNotifier',function($scope,mvIdentity,mvAuth,mvNotifier){

  console.log("mvIdentity.currentUser.userName: " + mvIdentity.currentUser.userName);
  $scope.email=mvIdentity.currentUser.userName;
  $scope.fname=mvIdentity.currentUser.firstName;
  $scope.lname=mvIdentity.currentUser.lastName;

  $scope.update=function(){
    var newUserData={
      userName:$scope.email,
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