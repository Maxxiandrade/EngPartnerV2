import React, { useEffect, useState } from 'react'
import style from './PrivateChat.module.css'
import Message from './Message'
import { useSelector } from 'react-redux'
import { onSnapshot, doc, collection, query } from 'firebase/firestore'
import {db} from '../../../firebase-config'

const Messages = () => {
    const chatId = useSelector((state)=>state.users.chatId)
    const user = useSelector((state)=>state.users.userChat)
    const [messages, setMessages] = useState([])

    useEffect(() => {
      if (chatId) { 
        const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        });
    
        return () => {
          unSub();
        };
      }
    }, [chatId]);
      console.log(messages)

  return (
    <div className={style.messages}>
      {messages?.map((m) => (
        <Message message={m} key={m.id} />
      ))}
      
    </div>
  )
}

export default Messages