var User = require('../models/user');

exports.insert = function(req, res){
    var _user = JSON.parse(req.query.user);

    User.findOne({name: _user.name}, function(err,user){
        if(err){
            console.log(err);
        }
        if(user){
            return res.json({message: '该用户已录入'});
        }
        else {         
            var user = new User(_user);
            user.save(function(err, user){
                if(err){
                    console.log(err);
                }else{
                    res.json({message: '成功录入'});
                }
            })
        }
    })
}
exports.list = function(req, res){
    User.fetch(function(err, users){
        if(err){
            console.log(err);
        }else{
            res.send(users);
        }
    })
}
exports.update = function(req, res) {
    var curUserName = req.query.userName,
        state = req.query.state;
    var updateUser;

    User.findOneAndUpdate({name: curUserName},{state:state},function(err, user){
        if(err){
            console.log(err);
        }
        else {
            User.fetch(function(err, users){
                if(err){
                    console.log(err);
                }else{
                    res.send(users);
                }
            })
        }
    });
}

exports.search = function (req, res) {
    var searchName = req.query.userName;

    User.findOne({name: searchName},function(err, user){
        if(err) {
            res.send("查找失败！");
        }
        else {
            res.send(user);
        }
    })
}