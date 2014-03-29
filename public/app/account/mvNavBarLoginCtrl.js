mvApp.controller('mvNavBarLoginCtrl', ['$scope','$http',function($scope,$http){
  $scope.signin=function(username,password){
    $http.post('/login',{userName:username,password:password}).then(function(response){
      if(response.data.success){
        console.log('logged in');
      }
      else {
        console.log('failed to log in');
      }
    })
    //console.log("not done yet");
  };
}])
