let MongoClient = require("mongodb").MongoClient
let ObjectID = require("mongodb").ObjectID

let Config = require('./config.js')

class Db {

    static getInstance() { //单例 多次实例化 实例不共享的问题
        if (!Db.instance) {
            Db.instance = new Db()
        }
        return Db.instance

    }
    constructor() {
        this.dbClient = "" //属性 放db对象
        this.connect()
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (!this.dbClient) {
                MongoClient.connect(Config.dbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true //这个即是报的警告
                }).then(client => {
                    let db = client.db(Config.dbName)
                    this.dbClient = db
                    resolve(this.dbClient)
                }).catch(err => {
                    reject(err)
                })
            } else {
                resolve(this.dbClient)
            }
        })
    }
    // 查找
    find(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).find(json)
                result.toArray((err, docs) => {
                    if (err) {
                        reject(err)
                        return;
                    }
                    resolve(docs)
                })
            })

        })
    }
    // 插入
    insert(collectionName, json) {

        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insertOne(json, (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
            })
        })
    }
    // 更新
    update(collectionName, json1, json2) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).updateOne(json1, {
                    $set: json2
                }, (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
            })
        })
    }

    // 删除
    remove(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).removeOne(json, (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })

            })
        })
    }
    getObjectID(id) {
        // mongodb里面查询 _id 把字符串转换成对象
        return new ObjectID(id)
    }
}

module.exports = Db.getInstance()
// let myDb = Db.getInstance()
// console.time('start')
// myDb.find('user', {}).then(data => {
//     console.log(data);
//     console.timeEnd('start')
// })