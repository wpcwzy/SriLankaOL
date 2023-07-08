const fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);
// 路由为/默认www静态文件夹
app.use('/', express.static(__dirname + '/public'));

io.on('connection', socket => {
    socket.emit('success', '连接到服务器')

    socket.on('disconnect', () => {
        io.emit('quit', socket.id)
    })
})

http.listen(3002, () => {
    console.log('http://localhost:3002/index.html')
})