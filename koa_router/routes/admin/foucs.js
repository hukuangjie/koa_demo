// 轮播图的增删改查

var router = require('koa-router')()

router.get('/', async ctx => {
    // ctx.body = '轮播图首页'
    await ctx.render('admin/foucs/index')
})

router.get('/add', async ctx => {
    await ctx.render('admin/foucs/add')

})

router.get('/edit', async ctx => {
    await ctx.render('admin/foucs/edit')

})

router.get('/delete', async ctx => {
    ctx.body = '删除轮播图'
})

module.exports = router.routes()