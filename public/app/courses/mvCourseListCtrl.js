angular.module('mvApp').controller('mvCourseListCtrl',['$scope','mvCourse',function($scope, mvCourse){
  $scope.courses =mvCourse.query();
}])