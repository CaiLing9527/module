// 该模块主要用于连接数据库,且判断连接状态

let mongoose=require('mongoose');
// mongoose.set('useCreateIndex',true) //使用一个新的索引创建器

const DB_NAME='users';
const PORT   ='27017';
const IP     ='localhost';

function connectMongo(callback){
        mongoose.connect(`mongodb://${IP}:${PORT}/${DB_NAME}`,{
        useNewUrlParser: true, //使用一个新的URL解析器，用于解决一些安全性问题。
        useUnifiedTopology: true ,//使用一个统一的新的拓扑结构。
        useUnifiedTopology: true
        })
        // 绑定数据库监听
        mongoose.connection.on('open',function(err){
        if(err){
            console.log('数据库连接失败',err);
            callback('connection failed')
            }
        else{
            console.log('数据库连接成功');
            // 操作数据库
            callback()
        }
        })
}
module.exports=connectMongo;