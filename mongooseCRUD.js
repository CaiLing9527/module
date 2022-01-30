
//1. 引入第三方库
let mongoose=require('mongoose');
//2.引入数据库连接模块
let db      =require('./db/db');
//3.引入模型对象
let stuModel=require('./model/studentsModel')


db(function(err){
    if(err){console.log(err)}
    else{
        //4.判断数据库连接状态.成功CRUD,错误报告
        //console.log('操作数据库的代码');
        stuModel.create({//stuModel 可改
          stu_id:'012',
          age:100,
          sex:'男',
          price:'11.5k',
          name:'XiXi'
          },function(err,data){
            if(!err){console.log(data)}
            else console.log(err)
          })
    }
})
