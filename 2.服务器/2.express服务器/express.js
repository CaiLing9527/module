//1.引入express模块
let express=require('express');
// 2.创建app应用对象
let app=express();
app.disable('x-powered-by');
// 3.配置路由文件
//   (1).路由是由一组key:value的组合,key是请求方式+URI路径,value是回调函数
//   (2).我们说的路由是后端路由
//   (3).根据路由的定义顺序,依次定义好路由,放入一个类数组结构中,当有请求时,依次取出匹配,匹配成功则不在匹配

  app.get('/',function(request,response){
            console.log(request.query)
            console.log(request.get('Host'))
            console.log(request.get('Referer'))
            response.send('我是主页')    
})
app.get('/yifu',function(request,response){
    response.send('我是二级页:衣服')    
})
app.get('/shiwu',function(request,response){
    response.send('我是二级页:食物')    
})
app.get('/yifu/shangyi',function(request,response){
    response.send('我是三级页:上衣')    
})
app.get('/yifu/kuzi',function(request,response){
    response.send('我是三级页:裤子')    
})
app.post('/',function(request,response){
    response.send('跟路由收到的post请求')    
})
// 4.指定服务器监听端口
app.listen(3000,function(err){
    if(!err){console.log('服务器启动成功')}
    else console.log('服务器启动失败',err)

})
