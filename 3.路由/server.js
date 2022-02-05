let express=require('express')
let app=express()

app.disable('x-powered-by')

//引入第三方中间件
// let bodyParser=require('body-parser')
// app.use(bodyParser.urlencoded({extended:true}))

// //req.query和req.get属性
// app.get('/',function(req,res){
//     console.log(req.query)
//     console.log(req.get('Host'))
//      //  console.log(req.get('Referer'))//referer有修改
//     //console.log(req.body)//需要中间件
//     res.send('ok')
// })
// //参数路由res.params res.send res.redirect
// app.get('/meishi/:id',function(req,res){
//     // res.sendFile(__dirname+'/public/vue.png')
//     // res.set('test','110')
//     // res.redirect('https://www.baidu.com/')
//     console.log(req.params)
//     let {id}=req.params;
//     res.send(`你好,${id}商家`)
//    }
// )

// 内置中间件+暴露静态资源
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.post('/',function(req,res){
    console.log(req.body)
    res.send('ok')
})

app.get('/',(req,res)=>{
    console.log(req.query)
    res.send('这是get请求页面')
})












app.listen(3000,function(err,date){
    if(!err)console.log('服务器启动成功')
    else console.log(err)
})

