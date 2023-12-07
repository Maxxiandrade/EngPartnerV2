import React, { useEffect, useState } from 'react'
import style from './PrivateChat.module.css'
import Message from './Message'
import { useSelector } from 'react-redux'
import { onSnapshot, doc, collection, query } from 'firebase/firestore'
import {db} from '../../../firebase-config'


const Messages = ( {languageChecked, setLanguageChecked, handleChangeSwitch} ) => {
    const chatId = useSelector((state)=>state.users.chatId)
    const user = useSelector((state)=>state.users.userChat)
    const [messages, setMessages] = useState([])

    useEffect(() => {
      if (chatId) {
        const unSub = onSnapshot(
          collection(db, 'messages'),
          (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
              // Verificar si el documento tiene la propiedad correcta
              if (doc.exists() && doc.data().chatId === chatId) {
                messages.push(doc.data());
              }
            });
            messages.sort((a, b) => a.date.toDate() - b.date.toDate());

            setMessages(messages);
          }
        );
    
        return () => {
          unSub();
        };
      }
    }, [chatId, setMessages]);
      console.log(messages)

  return (
    <div className={style.messages}>
      {messages?.map((m) => (
        <Message message={m} key={m.id} languageChecked={languageChecked} />
      ))}
      
    </div>
  )
}

export default Messages