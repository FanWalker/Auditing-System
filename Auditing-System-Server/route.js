const User = require('./controllers/user');

module.exports = function (app) {
    app.post('/user/new', User.insert);
    app.post('/user/admin/update', User.update)
    app.get('/user/admin', User.list);
    app.get('/user/admin/search', User.search);
}