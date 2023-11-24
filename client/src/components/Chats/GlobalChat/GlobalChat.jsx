import { useState, useEffect, useRef } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from "../../../firebase-config";
import style from './GlobalChat.module.css'
import { useDispatch } from "react-redux";
import { getById } from "../../../redux/actions/actions";

const GlobalChat = ({ room = "global", setRoom }) => {
  const dispatch = useDispatch();
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
      uid: auth.currentUser.uid,
      room
    });
    setNewMessage("");
  };

  const handleDetail = async (messageUid) => {
    const uid = messageUid;
     dispatch(getById(uid))
  };

  return (
    <div className={style.chatApp}>
      <div className={style.header}>
        <h1>Global chat</h1>
      </div>
      <div className={style.messages}>
        {messages.map((message) => (
          <div className={style.message} key={message.id}>
            <img src={message.profilePic} className={style.profilePic} onClick={() => handleDetail(message.uid)}/>
            <span className={style.user} onClick={() => handleDetail(message.uid)}>{`${message.user}: `}</span>{message.text}
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
