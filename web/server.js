/**
 * Created by lanhao on 15/5/17.
 */

//引入配置文件
const config = require('./config/config');

//引入小蓝框架
const Xiaolan = require('xiaolan');

const DictLoader = require('./lib/dict_loader');

let dictLoader = new DictLoader();
global.dict = dictLoader;
//启动监听服务
const app = new Xiaolan(config);

app.createServer();

