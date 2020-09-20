let MongoClient = require("mongodb").MongoClient

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
                }).then((err, client) => {
                    if (err) {
                        reject(err)
                    } else {
                        let db = client.db(Config.dbName)
                        this.dbClient = db
                        resolve(this.dbClient)
                    }
                })
            } else {
                resolve(this.dbClient)
            }
        })
    }

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
    insert() {

    }
    update() {}

}

module.exports = Db.getInstance()
// let myDb = Db.getInstance()
// console.time('start')
// myDb.find('user', {}).then(data => {
//     console.log(data);
//     console.timeEnd('start')
// })