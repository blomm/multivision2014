angular.module('mvApp').controller('mvDemPointsCtrl', ['$scope','mvDemPoints',function($scope,$mvDemPoints){
    $scope.demPoints = $mvDemPoints.query();
}]);