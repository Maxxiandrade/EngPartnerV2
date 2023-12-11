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
      /* await updateDoc(doc(db, "userChats", user.uid), {
        [chatId + ".lastMessage"]: {
          text,
        },
        [chatId + ".date"]: serverTimestamp(),
      }); */
      await addDoc(collection(db, "messages"), {
        id: uuid(),
        privateChatMessage: true,
        chatId: chatId, //El id del chat entre 2 personas
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
            <img src={attach} alt="" className={style.sendImg} />
            <input type="file"  style={{display:"none"}} id='file' onChange={e=>setImg(e.target.files[0])}/>
            <label htmlFor="file">
                <img src={img} alt=""  className={style.sendImg}/>
            </label>
            <button className={style.sendButton} onClick={handleSend}><img src={sendIcon} alt="send" className={style.sendIcon}/></button>
        </div>
    </div>
  )
}

export default Input