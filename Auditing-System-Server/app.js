const express = require('express');
const port = process.env.Port || 8889;
const mongoose = require('mongoose');
const app = express();

const dbUrl = 'mongodb://localhost:27017/24k';
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {useMongoClient: true});
console.log('MongoDB connect success!');

app.listen(port, function(){
    console.log('server start on ' + port);
});

app.use(express.static('public'))
require('./route')(app);
