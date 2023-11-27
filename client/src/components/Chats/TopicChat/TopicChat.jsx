import style from "./TopicChat.module.css";
import sendIcon from '../../../assets/sendIcon.svg'

import { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../../firebase-config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Chat = ({ room, setRoom }) => {
  const user = useSelector(state=> state.users)
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage == "") return;
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: user.user,
      profilePic:user.photo,
      uid: user.uid,
      room,
    });
    setNewMessage("");
  };
  return (
    <>
      <div className={style.chatApp}>
        <div className={style.header}>
          <h1>{room.toUpperCase()} chat:</h1>
        </div>
        <div className={style.messages}>
          {messages.map((message) => (
            <div className={style.message} key={message.id}>
              <Link to={`/profile/${message.uid}`}>
                <img src={message.profilePic} className={style.profilePic} />
              </Link>
              <Link to={`/profile/${message.uid}`}>
                <span className={style.user}>{`${message.user}: `}</span>
              </Link>
              <div className={style.textDiv}>
              {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className={style.newMessageForm}>
          <input
            className={style.newMessageInput}
            placeholder="Type a message..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button className={style.sendButton} type="submit">
          <img src={sendIcon} alt="Send" className={style.sendIcon}/>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;