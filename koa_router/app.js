const Koa = require('koa'),
    render = require('koa-art-template'),
    path = require('path'),
    router = require('koa-router')();

const app = new Koa()

// 配置模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});
var admin = require('./routes/admin')
var api = require('./routes/api')
var index = require('./routes/index')

router.use('/admin', admin) //在模块中暴露路由并启动路由
router.use('/api', api)
router.use('/', index)

app
    .use(router.routes()) //启动路由
    .use(router.allowedMethods())
app.listen(8008);