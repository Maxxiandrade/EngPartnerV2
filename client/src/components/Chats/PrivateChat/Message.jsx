import React from 'react'
import style from './PrivateChat.module.css'
import M from '../../../assets/M.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { getMyUser } from '../../../redux/actions/actions'
import { Link } from 'react-router-dom'
import Skeleton from '@mui/material/Skeleton';
import { Divider } from '@mui/material'
import { getFlagByCode } from '../../../utils/getFlagByCode'


const Message = ({ message, languageChecked }) => {
  const ref = useRef()
  const user = useSelector((state) => state.users.userChat)
  const uid = localStorage.getItem("uid");
  const photo = useSelector((state) => state.users.photo)
  const dispatch = useDispatch();
  const language = useSelector((state) => state.users.language);
  const languageRead = useSelector((state) => state.users.languageRead);
  const isVip = useSelector((state) => state.users.isVip);

  useEffect(() => {
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

          {/* Formato de mensaje si el usuario no es vip */}
          {message?.senderId === user?.uid && !isVip ?
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

          {/* Formato de mensaje si el usuario SI vip */}
          {message?.senderId === user?.uid && isVip ?
            !message.translatedText?.[language] ?
              <>
                <p className={style.pRecieve}>
                  <Skeleton sx={{ width: '100%' }} />
                  <Divider sx={{ margin: '3px 0', backgroundColor: '#6da9fc', borderBottomWidth: 3 }} />
                  <Skeleton sx={{ width: '100%' }} />
                </p>
              </>
              :
              <p className={style.pRecieve}>
                <span>{getFlagByCode(language)}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ wordBreak: 'break-word' }}>
                    {message.translatedText?.[language]}
                  </span>
                </div>

                <Divider sx={{ margin: '3px 0', backgroundColor: '#6da9fc', borderBottomWidth: 3 }} />

                <span>{getFlagByCode(languageRead)}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ marginRight: '5px', wordBreak: 'break-word' }}>
                    {message.translatedText?.[languageRead]}
                  </span>
                </div>
              </p>
            :
            null
          }
        </div>
      </div>

      <div className={style.messageContainerOwner}>
        <div className={style.messageSend}>
          {/* Formato de mensaje si el usuario no es vip */}
          {message?.senderId === uid && !isVip ?
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

          {/* Formato de mensaje si el usuario SI vip */}
          {message?.senderId === uid && isVip ?
            !message.translatedText?.[language] ?
              <>
                <p className={style.pSend}>
                  <Skeleton sx={{ width: '100%' }} />
                  <Divider sx={{ margin: '3px 0', backgroundColor: '#6da9fc', borderBottomWidth: 3 }} />
                  <Skeleton sx={{ width: '100%' }} />
                </p>
              </>
              :
              <p className={style.pSend}>
                <span>{getFlagByCode(language)}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ wordBreak: 'break-word' }}>{message.translatedText?.[language]}</span>
                </div>
                <Divider sx={{ margin: '3px 0', backgroundColor: '#6da9fc', borderBottomWidth: 3 }} />
                <span> {getFlagByCode(languageRead)}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ marginRight: '5px', wordBreak: 'break-word' }}>{message.translatedText?.[languageRead]} </span>
                </div>
              </p>
            :
            null
          }
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