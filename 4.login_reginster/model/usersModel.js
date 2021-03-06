let mongoose=require('mongoose')
//1.引入模式对象
let Schema = mongoose.Schema

//2.创建约束对象
let usersRule = new Schema({
  email:{
    type:String, //限制学号必须为：字符串
    required:true,
    unique:true
  },
  nick_name:{
    type:String, //限制姓名必须为：字符串
    required:true, //限制姓名为必填项
  },
  password:{
    type:String, //限制年龄必须为：字符串
    required:true, //限制年龄为必填项
  },
  date:{
    type:Date,
    default:Date.now()
  },
  enable_flag:{
    type:String,
    default:'Y'
  }
})

//3.创建模型对象
module.exports = mongoose.model('users',usersRule) //用于生成某个集合所对应的模型对象