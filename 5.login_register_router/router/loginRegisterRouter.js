//引入router构造函数,创建router实例--路由器就是一个小型的app
const {Router}=require('express')
let router    =new Router()

//引入userModel模型对象
let usersModel=require('../model/usersModel')
let {resolve}=require('path')



router.post('/register',(req,res)=>{
    console.log(req.body)
      //获得用户输入的注册信息
      let {email,nick_name,password,re_password}=req.body

      //邮箱昵称密码正则
      const emailReg    =/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      const nick_nameReg=/[\u4e00-\u9fa5]/gm;
      const passwordReg =/^[a-zA-z0-9_@+.&]{6,20}$/;

      if(!emailReg.test(email)){res.send('邮箱格式错误,用户名必须4-20位，主机名必须2-10位')}
      else if(!nick_nameReg.test(nick_name)){res.send('昵称格式错误,需要有中文昵称')}
      else if(!passwordReg.test(password)){res.send('密码格式错误,密码个数需要有6位以上')}
      else if(password !==re_password){res.send('两次密码不一致')}
      else{
          //去数据库中查询该邮箱是否注册过
       usersModel.findOne({email},function (err,data) {
      if(data){
        //如果注册过
        res.send('该邮箱已被注册,请更换邮箱')
      }else{
        //如果没有注册过
        usersModel.create({email,nick_name,password},function (err,data) {
          if(!err){

            res.send('注册成功')

            } //如果写入成功
          else{
                  console.log(err)//如果写入失败了
                  res.send('您当前的网络状态不稳定,稍后重试')
          }
        })
      }
    })
  }
})

router.post('/login',(req,res)=>{

    let {email,password}=req.body

    //邮箱密码正则
    const emailReg    =/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const passwordReg =/^[a-zA-z0-9_@+.&]{6,20}$/;
     
    if(!emailReg.test(email)){console.log('邮箱格式不正确')}
    if(!passwordReg.test(password)){console.log('密码格式不正确')}
    else{
        usersModel.findOne({email,password},(err,data)=>{
            if(err){
                console.log(err)
                res.send('网络不稳定,请稍后再试')
                return
            }
            if(data){
                res.redirect('https://www.baidu.com/')
                return
            }
            res.send('用户名或者密码输入错误')
        })
    }








})



module.exports=function(){
    return router
}