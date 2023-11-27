import {useRef } from "react";
import style from "./TopicsChat.module.css";

const TopicsChat = ({ setingValueRoom }) => {
  const roomInputRef = useRef(null);

  const handleTopic = (e)=>{
    const topic = e.target.value
    const selectedRoom = topic === 'null' ? null : topic !== '' ? topic : roomInputRef.current.value;
    setingValueRoom(selectedRoom);
  }

  return (
      <div className={style.room}>
        <label htmlFor="roomSelect"></label>
        <section>
          <select id="roomSelect" onChange={handleTopic} className={style.selectStyle}>
            <option disabled selected value="default">Select Chat</option>
            <option value="global" >Global</option>
            <option value="sports" >Sports</option>
            <option value="animals" >Animals</option>
            <option value="food" >Food</option>
            <option value="tech" >Tech</option>
          </select>
        </section>
        
        
        {/* funcion premium
        <button onClick={setValue}>
          Search topic chat
        </button> */}
      </div>
  );
};

export default TopicsChat;
