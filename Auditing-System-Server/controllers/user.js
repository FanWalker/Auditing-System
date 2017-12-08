var User = require('../models/user');

exports.insert = function(req, res){      //添加用户
    var _user = JSON.parse(req.query.user);

    User.findOne({name: _user.IDCartNumber}, function(err,user){
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
                    res.send(err);
                }else{
                    res.json({message: '成功录入'});
                }
            })
        }
    })
}
exports.showlist = function(req, res){
    var page = parseInt(req.query.p, 10) || 0;   //当前页码
    var state = req.query.state;                // 分类 有通过、不通过、待审核
    var count = 2;                              //每一页显示的数据条数
    var index = page * count;                      // 从index开始 到 index+5 结束
    var totalPage;                              // 总共有多少页

    User.find({state:state})                //找到 对应状态的user
        .exec(function(err, users){
            if(err) {
                console.log(err);
            }
            else{
                var results = users.slice(index, index+count);      //返回count条数据
                totalPage = Math.ceil(users.length/count);          //返回总共有多少页
                res.send({users: results, totalPage: totalPage});   
            }
        })
}
exports.update = function(req, res) {            //更新用户状态
    var curUserName = req.query.userName,
        updateState = req.query.state,
        originstate = req.query.originstate;
    var count = 2;

    User.findOneAndUpdate({name: curUserName},{state:updateState},function(err, user){
        if(err){
            console.log(err);
        }
        else {
            User.find({state: originstate})
                .exec(function(err, users){
                    if(err){
                        console.log(err)
                    }
                    else {
                        var results = users.slice(0, count);      //返回count条数据
                        totalPage = Math.ceil(users.length/count);          //返回总共有多少页
                        res.send({users: results, totalPage: totalPage});  
                    }
                })
        }
    });
}

exports.search = function (req, res) {      //用户的查询
    var searchName = req.query.userName;
    var page = parseInt(req.query.p, 10) || 0;   //当前页码
    console.log(page);
    var count = 5;                              //每一页显示的数据条数
    var index = page * count;                      // 从index开始 到 index+5 结束
    var totalPage;  

    User.find({name: searchName})
        .exec(function(err, users){
            if(users.length == 0 ) {
                res.send("error");
            }
            else {
                var results = users.slice(index, index+count);      //返回count条数据
                totalPage = Math.ceil(users.length/count);
                console.log(results);   
                res.send({users: results, totalPage: totalPage});
            }
    })
}
