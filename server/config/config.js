var path=require('path');

var rootPath=path.normalize(__dirname+'/../../');

module.exports={
  development:{
    db:'mongodb://localhost/multivision',
    rootPath:rootPath,
    port:process.env.PORT||3030
  },
  production:{
    db:'mongodb://blomm:multivision@ds033307.mongolab.com:33307/multivision',
    rootPath:rootPath,
    port:process.env.PORT||80
  }
}