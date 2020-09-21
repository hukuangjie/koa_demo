// 用户的增删改查

var router = require('koa-router')()

router.get('/', async ctx => {
    await ctx.render('admin/user/index')
})

router.get('/add', async ctx => {
    await ctx.render('admin/user/add')

})

router.get('/edit', async ctx => {
    await ctx.render('admin/user/index')

})

router.get('/delete', async ctx => {
    ctx.body = '删除用户'
})

module.exports = router.routes()