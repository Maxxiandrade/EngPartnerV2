import React from 'react'
import style from './PrivateChat.module.css'
import Messages from './Messages'
import Input from './Input'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Chat = () => {
  
  const user = useSelector(state => state.users.userChat)


  return (
    <div className={style.chat}>
      <div className={style.chatInfoDiv}>
        <Link to={`/profile/${user.uid}`}>
          <span className={style.chatInfo}>{user.user}</span>
        </Link>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat