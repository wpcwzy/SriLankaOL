user_id=null

window.socket = io();
        socket.on('connect', () => {
            window.socket.on('success', data => {
                alert(data)
            })

            window.socket.on('playerlist',data => {
                data=data.playerList
                console.log(data)
                $(".chat_user_list").empty()
                $(".chat_user_list").append("<em>在线玩家（点击昵称聊天）:</em><br>")
                for(var element in data)
                {
                    $(".chat_user_list").append(`<a class=\"pseudo button username\">${element}</a><br>`)
                }
                $(".username").click(selectChatTarget);
            })
        })

function selectChatTarget()
{
    const button=$(this)
    alert("和"+button.text()+"聊天")
}

function updateData()
{
    window.socket.emit('query_online')
}

function click_setid()
{
    while(!user_id)
    {
        user_id=prompt("请输入玩家ID，如果中途掉线，则输入掉线前的ID以继续游戏")
    }
    window.socket.emit('login',user_id)
    $("#setid_btn").attr("onclick","null")
    $("#setid_btn").attr("disabled","disabled")
    updateData()
}