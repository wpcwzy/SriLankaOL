userId=null
const adminList=['glamorgan','wpcwzy']

$(document).ready(function () {
    $("#admin_btn").hide()
    $(".chat").hide()
    $(".map").hide()
    $(".admin").hide()
});

window.socket = io();
socket.on('connect', () => {
    window.socket.on('success', data => {
        alert(data)
        updateData()
    })

    window.socket.on('refresh',() => {
        updateData()
    })
    window.socket.on('playerlist',data => {
        data=data.playerList
        console.log(data)
        $(".chat_user_list").empty()
        $(".chat_user_list").append("<em>在线玩家：</em><br>")
        for(var element in data)
            $(".chat_user_list").append(`<span>${element}</span><br>`)
    })

    window.socket.on('msg_recv',data => {
        console.log('recv_msg:'+data)
        $(".chat_history").append(`<span>${data}</span><br>`)
    })

    window.socket.on('chat_history',data => {
        console.log(data)
        if(data==null) return
        $(".chat_history").empty()
        for(var msg in data)
            $(".chat_history").append(`<span>${data[msg]}</span><br>`)
    })
})

function updateData()
{
    window.socket.emit('query_online')
}

function loadChatHistory()
{
    window.socket.emit('load_chat_history',userId)
}

function click_sendmsg()
{
    if(!userId)
    {
        alert("请先输入用户ID")
        return
    }
    window.socket.emit('send_msg',{sender:userId,content:`${userId}:`+$(".chat_content").val()})
    $(".chat_history").append(`<span>${userId}:${$(".chat_content").val()}</span><br>`)
    $(".chat_content").val("")
}

function click_setid()
{
    while(!userId)
    {
        userId=prompt("请输入玩家ID，如果中途掉线，则输入掉线前的ID以继续游戏")
    }
    if(adminList.includes(userId))
        $("#admin_btn").show()
    window.socket.emit('login',userId)
    $("#setid_btn").attr("onclick","null") //禁用点击事件
    $("#setid_btn").attr("disabled","disabled") //样式改为禁用状态
    updateData()
}

function click_admin()
{
    $(".chat").hide()
    $(".map").hide()
    $(".admin").show()
}

function click_chat()
{
    updateData()
    loadChatHistory()
    $(".chat").show()
    $(".map").hide()
    $(".admin").hide()
}


function click_map()
{
    $(".chat").hide()
    $(".map").show()
    $(".admin").hide()
}
