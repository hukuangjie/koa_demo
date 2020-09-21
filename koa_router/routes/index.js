var router = require('koa-router')()
router.get('/', async ctx => {
    await ctx.render('default/index')
})

router.get('case', async ctx => {
    ctx.body = '案例'
})

router.get('about', async ctx => {
    ctx.body = '关于我们'
    await ctx.render('default/about')
})

module.exports = router.routes()