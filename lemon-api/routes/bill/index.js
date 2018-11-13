var sql = require('../../mysql/sql');
var query = require('../../mysql');
var uuid = require('node-uuid');

function addBill(req, res, next) {
    var params = req.body;
    var uid = params.uid,
        cid = params.cid,
        create_time = params.create_time,
        money = params.money;
    if (!uid && !cid && !create_time && !money) {
        res.json({ code: 4, msg: '缺少参数' });
    } else {
        var lid = uuid.v1();
        var arr = [lid, uid, cid, create_time, money];
        query(sql.ADD_Bill, arr, function(err, result) {
            if (err) {
                res.json({ code: 0, msg: '服务器错误', err });
            } else {
                res.json({ code: 1, msg: '添加账单成功', result });
            }
        })
    }
}

function delBill(req, res, next) {
    var lid = req.body.lid;
    if (lid) {
        query(sql.DEL_BILL, [lid], function(err, result) {
            if (err) {
                console.log(err);
                res.json({ code: 0, msg: '服务器错误', err });
            } else {
                res.json({ code: 1, msg: '删除账单成功', result });
            }
        })
    } else {
        res.json({ code: 5, msg: '操作错误' });
    }
}
//查询账单
function selectBill(req, res, next) {
    var uid = req.body.uid;
    var type = req.query.type;
    var querySelect = req.query.querySelect;
    //querySelect 1 收支分类
    //querySelect 2 查分类 购物
    var sqlStr = sql.ALL_BILL; //默认所有的账单
    var condition;
    if (querySelect === 1) { //type 收入 支出
        sqlStr = sql.Type_BILL;
        condition = req.query.type;
    } else if (querySelect === 2) { //type 购物 住宿
        sqlStr = sql.CLASSIFY_BILL;
        condition = req.query.name;
    }

    if (uid) {
        query(sqlStr, [uid, condition], function(err, result) {
            if (err) {
                console.log(err);
                res.json({ code: 0, msg: '服务器错误', err });
            } else {
                res.json({ code: 1, msg: '查询账单成功', result });
            }
        })
    } else {
        res.json({ code: 2, msg: '用户不存在' });
    }
}
module.exports = {
    addBill: addBill,
    delBill: delBill,
    selectBill: selectBill
}