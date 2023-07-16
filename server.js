var express = require('express');
const { disconnect } = require('process');
var app = express();
var http = require('http').createServer(app);
var io = require("socket.io")(http);

app.use('/', express.static(__dirname + '/public'));

var playerList={}
var msgList={}

const adminList=['glamorgan','wpcwzy']

function reverseQuery(socketId)
{
    for(var player in playerList)
        if(playerList[player]==socketId)
            return playerList[player] 
    return null
}

io.on('connection', socket => {
    socket.emit('success', '连接服务器成功')

    socket.on('login',data => {
        console.log(data+'加入游戏成功')
        playerList[data]=socket.id
        io.emit('refresh')
    })

    socket.on('send_msg',data => { // data包含sender,content,其中sender是玩家id，content内容为：wpcwzy:xxx
        for(var admin in adminList)
            socket.to(playerList[adminList[admin]]).emit('msg_recv',data.content)
        // 判断chatid是否有过聊天记录
        if(!msgList[data.sender])
            msgList[data.sender]=new Array()
        msgList[data.sender].push(data.content)
        console.log(msgList[data.sender])
    })

    socket.on('query_online',() => {
        console.log('query_online')
        console.log(playerList)
        socket.emit('playerlist',{playerList})
    })

    socket.on('disconnect', () => {
        console.log(socket.id)
        delete reverseQuery(socket.id)
        console.log(playerList)
    })

    socket.on('load_chat_history',(data) => {
        socket.emit('chat_history',msgList[data])
    })
})

http.listen(3002, () => {
    console.log('http://localhost:3002/index.html')
})