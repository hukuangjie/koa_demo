const App = require('koa'),
    router = require('koa-router')(),
    views = require('koa-views'),
    bodyParser = require('koa-bodyparser'),
    static = require('koa-static'),
    path = require('path'),
    session = require('koa-session'),
    render = require('koa-art-template'),
    DB = require('./module/db');
const app = new App()
app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: true, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};
 
app.use(session(CONFIG, app));
// 配置art
render(app, {
    root: path.join(__dirname, 'views'), //视图位置
    extname: '.html', //后缀名
    debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
});

app.use(bodyParser())
app.use(static('static'));

router.get('/', async (ctx) => {
    let title = '你好art'
    let result= DB.find('user',{})
    console.log(result);
    ctx.cookies.set('userinfo', 'zhangsan', {

    })
    await ctx.render('index', {
        title
    })
}).get('/news', async (ctx, next) => {
    console.log("新闻列表");
    console.log(ctx.cookies.get('userinfo'));

    /*
        设置cookie时候编码：
        let key=new Buffer("曾强").toString('base64');
        let value=new Buffer("曾强呵呵").toString('base64');

        解码：
        let key=new Buffer("曾强").toString('base64');
        let info=ctx.cookies.get(key);
        let value=new Buffer(info,'base64').toString();=
    */
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
    await next()
    if (ctx.status == 404) {
        ctx.status = 404
        ctx.body = "这是一个404页面"
    } else {
        console.log(ctx.url);
    }
})

app
    .use(router.routes()) //启动路由
    .use(router.allowedMethods())
    .listen(3001);