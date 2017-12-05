const User = require('./controllers/user');
const Verification = require('./controllers/Verification');
const path = require('path');

module.exports = function (app) {
    app.post('/user/new', User.insert);
    app.post('/user/admin/update', User.update)
    app.get('/user/admin', User.showlist);
    app.get('/user/admin/search', User.search);
    app.get('/user/Verification', Verification.createCode)

    app.get('/', function(req ,res){
        const pa = path.resolve(__dirname, '../dist/index.html');
        res.sendFile(pa);
    })
}