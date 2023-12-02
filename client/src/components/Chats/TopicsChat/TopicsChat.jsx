import {useRef } from "react";
import style from "./TopicsChat.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const TopicsChat = ({ setingValueRoom }) => {
  const roomInputRef = useRef(null);
  const country = useSelector(state=> state.users.country)
  const Myrooms =useSelector(state=> state.users.rooms)
  console.log(country);
  const [rooms,setRooms]= useState(['Global','Sport','Animals',"Food",'Tech',country , ...Myrooms ])
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
            {rooms.map(room=>{
              return <option value={room.toLowerCase()} key={room}> {room} </option>
              })}
          </select>
        </section>
      </div>
  );
};

export default TopicsChat;
