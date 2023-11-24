import { useState, useRef } from "react";
import TopicChat from '../TopicChat/TopicChat'
import { Link } from "react-router-dom";
const TopicsChat = ()=>{
    const [room, setRoom] = useState(null)
    const roomInputRef = useRef(null)
    return(
        <div>
        {room ? (
          <div> <TopicChat room={room} setRoom={setRoom}/></div>
          ) : (
            <>
            <div className="room">
            <label htmlFor="">Enter topic</label>
            <input ref={roomInputRef}/>
            <button onClick={()=>setRoom(roomInputRef.current.value)}> Search topic chat</button>
          </div>
          <div>
            <Link to='/'>
            <button>Home</button>
            </Link>
          </div>
        </>
        )}
      </div>
    )
};

export default  TopicsChat;