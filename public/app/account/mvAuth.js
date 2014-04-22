angular.module('mvApp').factory('mvAuth',['$http','$q','mvIdentity','mvUser',function($http,$q,mvIdentity,mvUser){
  return{
    authenticateUser: function(username, password){
      var dfd=$q.defer();
      $http.post('/login',{username:username,password:password}).then(function(response){
        if(response.data.success){
          var user = new mvUser();
          angular.extend(user,response.data.user);
          mvIdentity.currentUser = user;
          dfd.resolve(true);
        }
        else {
          dfd.resolve(false);
        }
      })
      return dfd.promise;
    },
    createUser:function(newUserData){
      var newUser=new mvUser(newUserData);
      var dfd=$q.defer();

      newUser.$save().then(function(){
        mvIdentity.currentUser=newUser;
        dfd.resolve();
      },function(response){
        dfd.reject(response.data.reason);
      });

      return dfd.promise;
    },

    logoutUser:function(){
      var dfd=$q.defer();
      $http.post('/logout',{logout:true}).then(function(){
        mvIdentity.currentUser=undefined;
        dfd.resolve();
      }) ;
      return dfd.promise;
    },
    authoriseCurrentUserForRoute:function(role){
      if(mvIdentity.isAuthorised('admin')){
        return true;
      }
      else{
        return $q.reject('not authorised');
      }
    }

  }
}]);