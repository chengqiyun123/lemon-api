var express = require('express');
var router = express.Router();

var userApi = require('./user');

/* 添加user */
router.post('/', userApi.addUser);



module.exports = router;