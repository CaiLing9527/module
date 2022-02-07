const {Router}=require('express')

let router=new Router()
let {resolve}=require('path')

//用于展示登录和注册页面 UI路由 无任何逻辑
router.get('/login',(req,res)=>{
    let url=resolve(__dirname,'../public/login.html')
    res.sendFile(url)
})
router.get('/register',(req,res)=>{
    let url=resolve(__dirname,'../public/register.html')
    res.sendFile(url)

})

module.exports=function(){
    return router
}