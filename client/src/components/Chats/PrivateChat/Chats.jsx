import React, { useEffect, useState } from 'react'
import M from '../../../assets/M.jpg'
import style from './PrivateChat.module.css'
import { doc, onSnapshot } from "firebase/firestore";
import { useSelector } from 'react-redux';
import {db} from '../../../firebase-config';
import { useDispatch } from 'react-redux';
import { CHANGE_USER } from '../../../redux/action_types/userActionTypes';
import { chatReducer } from '../../../redux/actions/actions';

const Chats = () => {
    const dispatch = useDispatch();
    const [chats, setChats] = useState([])
    const uid = localStorage.getItem("uid");
    const uC = useSelector((state)=>state.users.userChat)
    const Ci = useSelector((state)=>state.users.chatId)

    useEffect(()=>{
        const getChats = ()=>{
        const unsub = onSnapshot(doc(db, "userChats", uid), (doc) => {
            setChats(doc.data())
        });
        return()=>{
            unsub()
        }
    };

    uid && getChats()
    },[uid])

    ;

    const handleSelect = (id)=>{
        dispatch(chatReducer(id))
    }

  return (
    <div>
        {Object.entries(chats)?.map(chat=>(
        <div className={style.userChat} key={chat[0]} onClick={()=>handleSelect(chat[1]?.userInfo)}>
                <img src={chat[1]?.userInfo.photo} alt="" className={style.img}/>
                <div className={style.userChatInfo}>
                    <span className={style.span}>{chat[1]?.userInfo.user}</span>
                    <p className={style.p}>{chat[1]?.userInfo.lastMessage?.text}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Chats