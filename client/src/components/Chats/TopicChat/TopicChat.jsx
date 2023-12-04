import style from "./TopicChat.module.css";
import sendIcon from '../../../assets/svg/sendIcon.svg'
import verify from '../../../assets/svg/verify.svg'
import ReportOption from "../ReportOption/ReportOption";
import report from "../../../assets/exclamation.svg"
import AdminSvg from'../../../assets/svg/admin-verify.svg'

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

  const isVip = useSelector(state => state.users.isVip)
  const language = localStorage.getItem('language')
  const languageRead = localStorage.getItem('languageRead')
  const user = useSelector(state => state.users)
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageOptions, setMessageOptions] = useState({})
  const [lastClickedMessageId, setLastClickedMessageId] = useState(null)
  const optionsRef = useRef(null)


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
      const initialOptions = {}
      snapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
        initialOptions[doc.id] = false
      });
      setMessages(fetchedMessages);
      setMessageOptions(initialOptions)
     
    });

    return () => unSubscribe();
  }, [room]);

  useEffect(()=>{
    const scroll = ()=> {messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });}
    scroll()
  },[messages])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage == "") return;
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: user.user,
      profilePic: user.photo,
      uid: user.uid,
      isVip: user.isVip,
      isAdmin:user.isAdmin,
      room,
    });
    setNewMessage("");
  };

  const handleOptionsClick = (messageId) => {
    setMessageOptions({
      ...messageOptions,
      [messageId]: !messageOptions[messageId]
    })
    setLastClickedMessageId(messageId)
    console.log(messageId)
  };
  
  return (
    <>
      <div className={style.chatApp}>
        <div className={style.header}>
          <h1>{room.toUpperCase()}</h1>
        </div>
        <div className={style.messages}>
          {messages.map((message) => (
            <div className={style.message} key={message.id}>
              <Link to={`/profile/${message.uid}`}>
                <img src={message.profilePic} className={style.profilePic} />
              </Link>
              <Link to={`/profile/${message.uid}`}>
                <span className={style.user}>
                  <div className={style.verifyDiv}>
                    {message.isAdmin ? <img src={AdminSvg} className={style.AdminSvg} /> :
                    message.isVip ? <img src={verify} className={style.verify} /> : ''
                    }
                  </div>
                  {`${message.user}:`}
                </span>
              </Link>
              <div className={style.textDiv}>
              <span onClick={() => handleOptionsClick(message.id)} ref={optionsRef}>
                
                {message.translatedText?.[language] ? message.translatedText?.[language] : message.text} {/* mensaje en lengua original */}
              </span>
              <hr />
              <span>
                {message.translatedText?.[languageRead] ? message.translatedText?.[languageRead] : message.text} {/* mensaje traducido */}
              </span>
              </div>
              <div>
                <img src={report} alt="" className={style.report} />
              {messageOptions[message.id] && message.id === lastClickedMessageId && <ReportOption 
              messageId={message.id}
              message={message.text}
              user={message.user}
              setLastClickedMessageId={setLastClickedMessageId}/>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={style.messageFormDiv}>
        <form onSubmit={handleSubmit} className={style.newMessageForm}>
          <input
            className={style.newMessageInput}
            placeholder="Type a message..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button className={style.sendButton} type="submit">
            <img src={sendIcon} alt="Send" className={style.sendIcon} />
          </button>
        </form>
        </div>
      </div>
    </>
  );
};

export default Chat;