describe('mvUser',function(){
  beforeEach(module('mvApp'));

  describe('isAdmin',function(){
    it("should return false if the user does not have admin inside their roles array",inject(function(mvUser){
      var user = new mvUser();
      user.roles=['not admin'];
      expect(user.isAdmin()).to.be.falsey;
    }));

    it("should return true when the user has admin in their roles array", inject(function(mvUser){
      var user = new mvUser();
      user.roles=['admin'];
      expect(user.isAdmin()).to.be.true;
    }));
  })
})