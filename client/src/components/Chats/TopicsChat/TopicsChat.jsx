import {useRef } from "react";

const TopicsChat = ({ setingValueRoom }) => {
  const roomInputRef = useRef(null);

  const handleTopic = (e)=>{
    const topic = e.target.value
    const selectedRoom = topic === 'null' ? null : topic !== '' ? topic : roomInputRef.current.value;
    setingValueRoom(selectedRoom);
  }

  return (
    <div>
      <div className="room">
        <label htmlFor="roomSelect">Choose a topic</label>
        <section>
          <select id="roomSelect" onChange={handleTopic}>
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
    </div>
  );
};

export default TopicsChat;
