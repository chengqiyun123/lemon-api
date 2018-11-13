var express = require('express');
var router = express.Router();

var BillApi = require('./bill/index');
console.log(BillApi.selectBill)
    /* 添加账单 */
router.post('/api/addBill', BillApi.addBill);
/* 删除账单 */
router.post('/api/delBill', BillApi.delBill);
/* 查询账单 */
router.post('/api/selectBill', BillApi.selectBill);

module.exports = router;