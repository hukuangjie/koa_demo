const App = require('koa'),
    router = require('koa-router')(),
    views = require('koa-views'),
    bodyParser = require('koa-bodyparser'),
    static = require('koa-static');
const app = new App()

const render = views(__dirname + '/views', {
    extension: 'ejs'
})
app.use(render)
app.use(bodyParser())
app.use(static('static'));

router.get('/', async (ctx) => {
    let title = '你好ejs'

    await ctx.render('index', {
        title
    })
}).get('/news', async (ctx, next) => {
    console.log("新闻列表");
    let arr = [1111, 222, 3333, 4444]
    await ctx.render('news', {
        arr
    })
}).get('/form', async (ctx, next) => {
    await ctx.render('form')
}).post('/doAdd', async (ctx) => {
    // 获取表单提交的数据
    ctx.body = ctx.request.body
    console.log(ctx.request.body);
}).get('/newscontent', async (ctx) => {
    // console.log(ctx.request.query);
    console.log(ctx.request.querystring);
    ctx.body = "新闻详情"
})
app.use(async (ctx, next) => {
    console.log('1' + new Date());
    await next()
    if (ctx.status == '404') {
        ctx.status = '404'
        ctx.body = "这是一个404页面"
    } else {
        console.log(ctx.url);
    }
})

app
    .use(router.routes()) //启动路由
    .use(router.allowedMethods())
    .listen(3000);