import React from 'react'
import style from './PrivateChat.module.css'
import attach from '../../../assets/svg/attach.svg'
import img from '../../../assets/svg/img.svg'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Timestamp, arrayUnion, doc, updateDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore'
import {db} from '../../../firebase-config'
import {v4 as uuid} from "uuid"
import sendIcon from "../../../assets/svg/sendIcon.svg"


const Input = () => {
  const [text, setText] = useState("")
  const uid = localStorage.getItem("uid");
  const user = useSelector((state)=>state.users.userChat)
  const userPhoto = useSelector((state)=>state.users.photo)
  const userChat = user.uid
  const chatId = useSelector((state)=>state.users.chatId)

  const handleSend = async(e)=>{
    e.preven
      if(chatId)
      await updateDoc(doc(db,"chats", chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: uid,
          date:Timestamp.now(),
          photo: user.photo
        })
      })
      await addDoc(collection(db, "messages"), {
        id: uuid(),
        privateChatMessage: true,
        chatId: chatId,
        senderId: uid,
        photo: userPhoto,
        text: text,
        reciverId: user.uid,
        photoReciver: user.photo,
        date: Timestamp.now(),
      })  
      setText("");
  }
  return (
    <div className={style.inputComp}>
        <input type="text" placeholder='Type a message...' className={style.input} onChange={e=>setText(e.target.value)} value={text}/>
        <div className={style.send}>
            <button className={style.sendButton} onClick={handleSend}><img src={sendIcon} alt="send" className={style.sendIcon}/></button>
        </div>
    </div>
  )
}

export default Input