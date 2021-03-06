angular.module('mvApp').factory('mvIdentity',['$window','mvUser',function($window,mvUser){

  var currentUser;

  if(!!$window.bootstrappedUserObject){
    currentUser= new mvUser();
    angular.extend(currentUser,$window.bootstrappedUserObject);
  }
  return{
    currentUser:currentUser,
    isAuthenticated: function(){
      return !!this.currentUser;
    },
    isAuthorised:function(role){
      return !! this.currentUser && this.currentUser.roles.indexOf(role) >- 1;
    }
  }
}])