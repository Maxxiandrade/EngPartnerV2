import React from 'react'
import style from './PrivateChat.module.css'
import Messages from './Messages'
import Input from './Input'
import { useSelector } from 'react-redux'


const Chat = () => {
  const user = useSelector(state=>state.users.userChat)

  return (
    <div className={style.chat}>
        <div className={style.chatInfo}>
          <span>{user.user}</span>
        </div>
        <Messages/>
        <Input/>
    </div>
  )
}

export default Chat