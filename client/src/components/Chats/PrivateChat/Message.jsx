import React from 'react'
import style from './PrivateChat.module.css'
import M from '../../../assets/M.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { getMyUser } from '../../../redux/actions/actions'
import Skeleton from '@mui/material/Skeleton';


const Message = ({ message, languageChecked }) => {
  const ref = useRef()
  const user = useSelector((state) => state.users.userChat)
  const uid = localStorage.getItem("uid");
  const photo = useSelector((state) => state.users.photo)
  const dispatch = useDispatch();
  const language = useSelector((state) => state.users.language);
  const languageRead = useSelector((state) => state.users.languageRead);

  useEffect(() => {
    console.log(message);
  }, [message]);
  console.log(message);
  return (
    <div className={style.messageContainer} ref={ref}>
      
      <div className={style.messageRecieveInfo}>
        {message?.senderId === user?.uid ?

          <img src={user?.photo} alt="" className={style.img} />
          : null}
        <div className={style.messageRecieve}>
          {message?.senderId === user?.uid ?
            !message.translatedText?.[language] ?
            <p className={style.pRecieve}> <Skeleton sx={{ width: '100%' }} /> </p>
            :
            languageChecked === false ? 
            <p className={style.pRecieve}> {message.translatedText?.[language]} </p>
            :
            <p className={style.pRecieve}> {message.translatedText?.[languageRead]} </p>
            : 
           null
          }
        </div>
      </div>
      
      <div className={style.messageContainerOwner}>

        <div className={style.messageSend}>
        {message?.senderId === uid ?
            !message.translatedText?.[language] ?
            <p className={style.pSend}> <Skeleton sx={{ width: '100%' }} /> </p>
            :
            languageChecked === false ? 
            <p className={style.pSend}> {message.translatedText?.[language]} </p>
            :
            <p className={style.pSend}> {message.translatedText?.[languageRead]} </p>
            : 
           null
          }
        </div>
        <div className={style.messageSendInfo}>
          {message?.senderId === uid ? <img src={photo} alt="" className={style.img} /> : null}
        </div>

      </div>

    </div>

  )
}

export default Message