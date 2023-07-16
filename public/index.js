userId=null
const adminList=['glamorgan','wpcwzy']

$(document).ready(function () {
    $("#admin_btn").hide()
    $(".chat").hide()
    $(".map").hide()
    $(".stat").hide()
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
        $(".chat_user_list").append("<em>在线玩家</em><br>")
        for(var element in data)
            $(".chat_user_list").append(`<span>${element}</span><br>`)
    })

    window.socket.on('msg_recv',data => {
        console.log('recv_msg:'+data)
        $(".chat_history").append(`<span>${data}</span><br>`)
    })
})

function updateData()
{
    window.socket.emit('query_online')
}

function click_sendmsg()
{
    if(!userId)
        alert("请先输入用户ID")
    window.socket.emit('send_msg',{sender:userId,content:`${userId}:`+$(".chat_content").val()})
    $(".chat_history").append(`<span>${userId}:${$(".chat_content").val()}</span><br>`)
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
    $(".stat").hide()
    $(".admin").show()
}

function click_chat()
{
    updateData()
    loadChatHistory()
    $(".chat").show()
    $(".map").hide()
    $(".stat").hide()
    $(".admin").hide()
}


function click_map()
{
    $(".chat").hide()
    $(".map").show()
    $(".stat").hide()
    $(".admin").hide()
}


function click_stat()
{
    $(".chat").hide()
    $(".map").hide()
    $(".stat").show()
    $(".admin").hide()
}

