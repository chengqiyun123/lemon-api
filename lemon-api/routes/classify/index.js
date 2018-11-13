var sql = require('../../mysql/sql');
var query = require('../../mysql');
var uuid = require('node-uuid');

function addClassify(req, res, next) {
    var params = req.body;

    var cName = params.cName,
        cIcon = params.cIcon,
        cType = params.cType,
        uid = params.uid;
    console.log(params);

    if (!cName || !cIcon || !cType || !uid) {
        res.json({ code: 4, msg: '丢失参数' });
    } else {
        classifyHas();
    }
    //查询分类是否存在
    function classifyHas() {
        query(sql.CLASSIFY_ISHAS, [uid, cName], function(err, result) {
            if (err) {
                console.log(err);
                res.json({ code: 0, msg: '服务器有错误' });
            } else {
                if (result.length > 0) {
                    res.json({ code: 3, msg: '此分类已存在' });
                } else {
                    add();
                }
            }
        })
    }
    //不存在 添加分类
    function add() {
        query(sql.ADD_CLASSIFY, [cName, cIcon, cType, uid], function(err, result) {
            if (err) {
                console.log(err);
                res.json({ code: 0, msg: '服务器有错误' });
            } else {
                res.json({ code: 1, msg: '此分类添加成功', result });
            }
        })
    }

}
module.exports = {
    addClassify: addClassify
}