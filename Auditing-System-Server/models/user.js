var mongoose = require('mongoose');
var userSchema = require('../schemas/user'); //引入'../schemas/user.js'导出的模式模块

// 编译生成user模型
var User = mongoose.model('user', userSchema);

// 将userie模型[构造函数]导出
module.exports = User;