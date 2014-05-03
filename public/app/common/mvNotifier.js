//puts the toaster object into a globally accessible service
angular.module('mvApp').value('mvToastr',toastr);

//put it into a factory
angular.module('mvApp').factory('mvNotifier',['mvToastr',function(mvToastr){
  return{
    notify:function(msg){
      if(msg.toLowerCase().indexOf('success')!=-1)
        mvToastr.success(msg);
      else if(msg.toLowerCase().indexOf('fail')!=-1)
        mvToastr.error(msg);
      else
        mvToastr.success(msg);
      console.log(msg);
    },
    error:function(msg){
      mvToastr.error(msg);
      console.log(msg);
    }
  }
}])