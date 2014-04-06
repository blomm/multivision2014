angular.module('mvApp').controller('mvUserListCtrl', ['$scope','mvUser',function($scope,mvUser){
  $scope.users= mvUser.query();

}])