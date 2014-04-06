angular.module('mvApp').factory('mvIdentity',['$window','mvUser',function($window,mvUser){
  var currentUser;
  if(!!$window.bootstrappedUserObject){
    currentUser= new mvUser();
    angular.extend(currentUser,$window.bootstrappedUserObject);
  }
  return{
    currentUser:currentUser,
    isAuthenticated: function(){
      // !! casts value to boolean and ensures a boolean type
      return !!this.currentUser;
    }
  }
}])