var express = require('express');
const { disconnect } = require('process');
var app = express();
var http = require('http').createServer(app);
var io = require("socket.io")(http);

app.use('/', express.static(__dirname + '/public'));

var playerList={}
var msgList=new Array()

class ChatHistory{
    constructor(sideA,sideB){
        this.sideA=sideA
        this.sideB=sideB
    }
    chat=new Array()
}

io.on('connection', socket => {
    socket.emit('success', '连接服务器成功')

    socket.on('login',data => {
        console.log(data+'加入游戏成功')
        playerList[data]=socket.id
    })

    socket.on('send_chat',data => {
        
    })

    socket.on('query_online',() => {
        console.log('query_online')
        console.log(playerList)
        socket.emit('playerlist',{playerList})
    })

    socket.on('disconnect', () => {
        console.log(socket.id)
        for(var player in playerList)
        {
            if(playerList[player]==socket.id)
                delete playerList[player]
        }
        console.log(playerList)
    })
})

http.listen(3002, () => {
    console.log('http://localhost:3002/index.html')
})