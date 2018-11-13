/*
 * @Author: chengqiyun 
 * @Date: 2018-11-09 18:43:58 
 * @Last Modified by: chengqiyun
 * @Last Modified time: 2018-11-11 18:28:40
 */

var mysql = require('mysql');

var pool = mysql.createPool({
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'lemon',
    connectionLimit: 100
})

/**
 * @param {string} sql sql语句
 * @param {array} arr sql需要的参数
 * @param {function} fn 回调函数
 */
function query(sql, arr, fn) {
    pool.getConnection(function(err, con) {
        if (err) {
            fn && fn(err);
        } else {
            con.query(sql, arr, function(err, result) {
                if (err) {
                    fn && fn(err);
                } else {
                    fn && fn(null, result);
                    con.release();
                }
            })
        }
    })
}
module.exports = query;