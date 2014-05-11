var mongoose =require('mongoose');

var courseSchema=mongoose.Schema({
  title: {type:String, required:'{PATH} is required!'},
  featured: {type:Boolean,required:'{PATH} is required!'},
  published: {type:Date,required:'{PATH} is required!'},
  tabs:[String]

});

var Course=mongoose.model('Course',courseSchema);

function createDefaultCourses(){
  Course.find({}).exec(function(err,collection){
    if(collection.length===0){
      Course.create({title:'How to Win friends',featured:true,published:new Date('2014', '10', '21'),tags:['c#']});
      Course.create({title:'Gardening for tools',featured:true,published:new Date('2014', '11', '8'),tags:['JS,misc']});
      Course.create({title:'Care of your grandma',featured:false,published:new Date('2014', '7', '18'),tags:['coding']});
      Course.create({title:'Picking a good suit',featured:true,published:new Date('2014', '3', '29'),tags:['c#']});
      Course.create({title:'Shovelling shit for beginners',featured:true,published:new Date('2014', '1', '20'),tags:['JS']});
      Course.create({title:'Telling lies',featured:false,published:new Date('2014', '12', '28'),tags:['c#,misc']});
      Course.create({title:'Creating your first origami',featured:true,published:new Date('2014', '10', '23'),tags:['c#,JS']});
      Course.create({title:'Having a difficult year',featured:true,published:new Date('2014', '9', '16'),tags:['c#,coding']});
      Course.create({title:'Taking out the trash',featured:true,published:new Date('2014', '1', '19'),tags:['c#, misc']});
    }
  })
}

exports.createDefaultCourse=createDefaultCourses;