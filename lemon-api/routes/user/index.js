var sql = require('../../mysql/sql');
var query = require('../../mysql');
var uuid = require('node-uuid');

function addUser(req, res, next) {
    var params = req.body;
    var nickName = params.nickName;
    var uid = params.uid;

    if (!nickName) {
        res.json({ code: 2, msg: '用户名不存在' });
        return;
    } else if (!uid) { //没有注册过
        userIshas();
    }

    //检测用户名是否存在数据库
    function userIshas() {
        query(sql.USER_ISHAS, [nickName], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: '服务器错误' });
            } else {
                if (result.length > 0) {
                    res.json({ code: 3, msg: '用户名已被占用' })
                } else {
                    add();
                }

            }
        })
    }
    //添加
    function add() {
        uid = uuid.v1();
        query(sql.ADD_USER, [uid, nickName], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: '服务器错误' });
            } else {
                res.json({ code: 1, msg: '添加成功', uid: uid });
            }
        })
    }

}
module.exports = {
    addUser: addUser
}