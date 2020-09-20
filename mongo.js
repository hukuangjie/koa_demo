let MongoClient = require("mongodb").MongoClient

let dbUrl = 'mongodb://127.0.0.1:27017/'

let dbName = 'koa'
console.time('start')
MongoClient.connect(dbUrl, (err, client) => {
    if (err) {

        console.log(err);
        return
    }

    let db = client.db(dbName)
    // db.collection('user').insertOne({
    //     'username': "张三1",
    //     'age': 23,
    //     'sex': "男",
    //     'status': "1"
    // }, (err, result) => {
    //     if (!err) {
    //         console.log('增加数据成功');
    //         client.close()
    //         console.timeEnd('start')
    //     }
    // })

    let result = db.collection('user').find({})
    result.toArray((err,docs)=>{
        console.log(docs);
            console.timeEnd('start')

    })
})