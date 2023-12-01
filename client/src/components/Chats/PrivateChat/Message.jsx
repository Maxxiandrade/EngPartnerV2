import React from 'react'
import style from './PrivateChat.module.css'
import M from '../../../assets/M.jpg'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'


const Message = ({message}) => {
    const ref = useRef()
    const user = useSelector((state)=>state.users.userChat)
    const uid = useSelector((state)=>state.users.uid)
    const photo = useSelector((state)=>state.users.photo)

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
        console.log(message);
      }, [message]);

    console.log(message);
  return (
    <div className={style.messageContainer} ref={ref}>
        <div className={style.messageRecieveInfo}>
        {message.senderId === user.uid ? 
            <img src={user.photo} alt="" className={style.img}/>
                : null}
        </div>
        <div className={style.messageRecieve}>
        {message.senderId === user.uid ? 
            <p className={style.pRecieve}>{message.text}</p> : null}
            
        </div>
        <div className={style.messageContainerOwner}>
            <div className={style.messageSend}>
            {message.senderId === uid ? <p className={style.pSend}>{message.text}</p> : null}
            </div>
            <div className={style.messageSendInfo}>
                {message.senderId === uid ?  <img src={photo} alt=""  className={style.img}/> : null}
               
            </div>
        </div>
    </div>
    
  )
}

export default Message