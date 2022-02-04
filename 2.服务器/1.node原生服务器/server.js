//搭建node原生服务器

//1.引入node内置的http模块
let http =require('http');
let qs= require('querystring');//引入node内置的模块,用于解析key=value&key=value这种urlencoded字符串,解析为对象
//2.创建服务对象
let server =http.createServer(function(request,response){
    //request:请求对象,客户端给服务器的内容
    //response:响应对象,服务器给客户端的内容
    // console.log(request.url)
    let params=request.url.split('?')[1]
    // //name=coco&age=18
    let objParams=qs.parse(params);
    let {name,age}=objParams


    response.setHeader('content-type','text/html;charset=utf-8');
    response.end(`<h1>你好${name},你${age}</h1>`)
});

//3.指定服务器运行端口号(绑定端口监听)
server.listen(3000,function(err){//3000,4000,5000,8080常用端口号
    if(!err){console.log('服务器启动成功')}
    else console.log(err)
})