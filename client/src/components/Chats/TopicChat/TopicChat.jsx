import style from "./TopicChat.module.css";
import sendIcon from '../../../assets/svg/sendIcon.svg'
import verify from '../../../assets/svg/verify.svg'
import ReportOption from "../ReportOption/ReportOption";
import report from "../../../assets/svg/exclamation.svg"
import AdminSvg from '../../../assets/svg/admin-verify.svg'
import TopicsChat from "../TopicsChat/TopicsChat";
import Skeleton from '@mui/material/Skeleton';

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

const Chat = () => {

  const [room, setRoom] = useState("global");

  const setingValueRoom = (value) => {
    if (value === 'null') {
      setRoom("global");
    } else {
      setRoom(value);
    }
  };

  const language = localStorage.getItem('language')
  const languageRead = localStorage.getItem('languageRead')
  const user = useSelector(state => state.users)
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageOptions, setMessageOptions] = useState({})
  const [lastClickedMessageId, setLastClickedMessageId] = useState(null)
  const optionsRef = useRef(null)
  const [languageChecked, setLanguageChecked] = useState(localStorage.getItem('languageChecked') === 'true' ? true : false);

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

  useEffect(() => {
    console.log('klajaslkdsakjdalkjdskda');
  }, [messages, languageChecked])

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
      isAdmin: user.isAdmin,
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

  const handleChangeSwitch = () => {
    setLanguageChecked(!languageChecked);
    localStorage.setItem('languageChecked', !languageChecked);
  }

  return (
    <>
      <div className={style.chatApp}>
        <div className={style.header}>
          <TopicsChat setingValueRoom={setingValueRoom} languageChecked={languageChecked} setLanguageChecked={setLanguageChecked} handleChangeSwitch={handleChangeSwitch} />
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
                {
                  !message.translatedText?.[language] ?
                  <Skeleton sx={{ width: '100%' }} />
                  :
                  languageChecked === false ? 
                  <span> {message.translatedText?.[language]} </span>
                  :
                  <span> {message.translatedText?.[languageRead]} </span>
                }
              </div>
              <div>
                <img src={report} alt="" className={style.report} onClick={() => handleOptionsClick(message.id)} ref={optionsRef} />
                {messageOptions[message.id] && message.id === lastClickedMessageId && <ReportOption
                  messageId={message.id}
                  message={message.text}
                  user={message.uid}
                  setLastClickedMessageId={setLastClickedMessageId} />}
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