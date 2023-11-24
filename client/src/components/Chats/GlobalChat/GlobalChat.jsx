import { useState, useEffect, useRef } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from "../../../firebase-config";
import style from './GlobalChat.module.css'

const GlobalChat = ({ room = "global", setRoom }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = collection(db, "messages");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", "global"),
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
    if (newMessage === "") return;
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      profilePic: auth.currentUser.photoURL,
      room
    });
    setNewMessage("");
  };

  return (
    <div className={style.chatApp}>
      <div className={style.header}>
        <h1>Global chat</h1>
      </div>
      <div className={style.messages}>
        {messages.map((message) => (
          <div className={style.message} key={message.id}>
            <img src={message.profilePic} className={style.profilePic}/>
            <span className={style.user}>{`${message.user}: `}</span>{message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <br />
      <form onSubmit={handleSubmit} className={style.newMessageForm}>
        <input
          className={style.newMessageInput}
          placeholder="Type your message here"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button className={style.sendButton} type="submit">Send</button>
      </form>
    </div>
  );
};

export default GlobalChat;
