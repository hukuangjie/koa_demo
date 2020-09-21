const Koa = require('koa'),
    router = require('koa-router')();
const app = new Koa()

var admin = require('./routes/admin')

router.get('/', (ctx) => {
    ctx.body = "这是一个首页"
})

router.use('/admin', admin.routes())

app
    .use(router.routes()) //启动路由
    .use(router.allowedMethods())
app.listen(8008);