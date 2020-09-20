class Db {

    static getInstance() {
        /* 单例 */
        if (!Db.instance) {
            Db.instance = new Db();
        }

        return Db.instance
    }

    constructor(name) {
        this._name = name
        console.log('实例化的时候会触发构造函数');
        this.connect()
    }
    connect() {
        console.log('链接数据库');
    }
    find() {
        console.log('查询数据库');
    }
    // run() {
    //     console.log(this._name);
    // }

    // static work() {
    //     /*静态方法*/
    //     console.log("这是es6里面的静态方法");
    // }
}

// Db.instance = "这是一个静态方法的属性"

// new Db('张三').run()
var myDb = Db.getInstance()
var myDb2 = Db.getInstance()
// console.log(Db.instance);
// Db.work()

myDb.find()
myDb2.find()
// Promise.reject(() => console.log(1))
//     .catch(() => console.log(3))
//     .then(() => console.log(2))
//     .then(() => console.log(4))
//     .finally(() => console.log(5))