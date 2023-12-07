import React from 'react'
import style from './PrivateChat.module.css'
import M from '../../../assets/M.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { getMyUser } from '../../../redux/actions/actions'
import { Link } from 'react-router-dom'

const Message = ({ message }) => {
  const ref = useRef()
  const user = useSelector((state) => state.users.userChat)
  const uid = localStorage.getItem("uid");
  const photo = useSelector((state) => state.users.photo)
  const dispatch = useDispatch();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    console.log(message);
  }, [message]);
  console.log(message);
  return (
    <div className={style.messageContainer} ref={ref}>

      <div className={style.messageRecieveInfo}>
        {message?.senderId === user?.uid ?
          <Link to={`/profile/${user.uid}`}>
            <img src={user?.photo} alt="" className={style.imgChat} />
          </Link>
          : null}
        <div className={style.messageRecieve}>
          {message?.senderId === user?.uid ?
            <p className={style.pRecieve}>{message?.text}</p> : null}
        </div>
      </div>

      <div className={style.messageContainerOwner}>
        <div className={style.messageSend}>
          {message?.senderId === uid ? <p className={style.pSend}>{message?.text}</p> : null}
        </div>
        <div className={style.messageSendInfo}>
          {message?.senderId === uid ?
            <Link to={`/profile/${uid}`}>
              <img src={photo} alt="" className={style.imgChat} />
            </Link>
            : null}
        </div>

      </div>

    </div>

  )
}

export default Message