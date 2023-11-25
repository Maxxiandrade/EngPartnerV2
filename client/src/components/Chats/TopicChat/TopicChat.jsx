import { useEffect, useState, useRef } from "react";
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from 'firebase/firestore'
import { auth, db } from "../../../firebase-config";
import style from './TopicChat.module.css'
import { set } from "firebase/database";
import { Link } from "react-router-dom";

const Chat = ({room, setRoom})=>{
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    const messageRef = collection(db, "messages")
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const queryMessages = query(
          messageRef,
          where("room", "==", room),
          orderBy("createdAt")
        );
    
        const unSubscribe = onSnapshot(queryMessages, (snapshot) => {
          const fetchedMessages = [];
          snapshot.forEach((doc) => {
            fetchedMessages.push({ ...doc.data(), id: doc.id });
          });
          setMessages(fetchedMessages);
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        });
    
        return () => unSubscribe();
      }, [room]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(newMessage == "") return;
        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            profilePic: auth.currentUser.photoURL,
            room,
        });
        setNewMessage("");
    };

    const clearRoom = ()=>{
        setRoom(null)
    }
    return(
        <>
        <div className={style.chatApp}>
            <div className={style.header}>
                <h1>You're now in room: {room.toUpperCase()}</h1>
            </div>
            <div className={style.messages}>{messages.map((message)=>(
            <div className={style.message} key={message.id}>
             <Link to={`/profile/${message.uid}`}>
            <img src={message.profilePic} className={style.profilePic}/>
            <span className={style.user}>{`${message.user}: `}</span>{message.text} 
             </Link>
            </div>))}
            <div ref={messagesEndRef} />
            </div>
            <br />
            <form onSubmit={handleSubmit} className={style.newMessageForm}>
                <input className={style.newMessageInput} placeholder="Type your message here" onChange={(e)=> setNewMessage(e.target.value)} value={newMessage}/>
                <button className={style.sendButton} type="submit">Send</button>
            </form>
            <button onClick={clearRoom} className={style.sendButton}>Back</button>
        </div>
        </>
    )
};

export default Chat;