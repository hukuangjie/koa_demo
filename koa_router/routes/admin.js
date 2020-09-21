var router = require('koa-router')()
var user = require('./admin/user')
var foucs = require('./admin/foucs')
var newscate = require('./admin/newscate')

// 配置admin的子路由 ，层级路由
router.get('/',async (ctx) => {
    ctx.body = '后台管理系统首页'
})

router.use('/user', user)
router.use('/foucs', foucs)
router.use('/newscate', newscate)

module.exports = router.routes()