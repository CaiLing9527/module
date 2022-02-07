//引入模块并且创建express对象
let express=require('express')
let app=express()
app.disable('x-powered-by')

//暴露静态资源
app.use(express.static(__dirname+'/public'))

// 引入模块以及模型对象对象进行CRUD
// let mongoose    = require('mongoose')
const usersModel= require('./model/usersModel')
// 连接数据库
const db        = require('./db/db')

//使用内置类解析bodyParser中间件
app.use(express.urlencoded({extended:true}))

db(()=>{
    //用于展示登录和注册页面 UI路由 无任何逻辑
    app.get('/login',(req,res)=>{
        res.sendFile(__dirname+'/public/login.html')
    })
    app.get('/register',(req,res)=>{
        res.sendFile(__dirname+'/public/register.html')
    })

    //
    app.post('/register',(req,res)=>{
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
            if(!err){res.send('注册成功了')} //如果写入成功
            else{
                    console.log(err)//如果写入失败了
                    res.send('您当前的网络状态不稳定,稍后重试')
            }
          })
        }
      })
    }
})
        app.listen(3000,function(err,date){
            if(!err){console.log('服务器启动成功')}
            else console.log(err)
        })
},(err)=>{
    console.log('连接数据库失败',err)
})
