import { useState, useRef, useEffect } from "react";

const TopicsChat = ({ setingValueRoom }) => {
  const roomInputRef = useRef(null);
  const [optionRooms, setOptionRooms] = useState(['futbal', 'lenguaje', 'dogs', 'cats']);

  const setValue = () => {
    const selectedValue = document.getElementById('roomSelect').value;
    const selectedRoom = selectedValue === 'null' ? null : selectedValue !== '' ? selectedValue : roomInputRef.current.value;
    setingValueRoom(selectedRoom);
  };

  return (
    <div>
      <div className="room">
        <label htmlFor="roomSelect">Choose a topic</label>
        <section>
          <select id="roomSelect">
            {optionRooms.map((room, index) => (
              <option key={index} value={room}>
                {room}
              </option>
            ))}
          </select>
        </section>
        <button onClick={setValue}>
          Search topic chat
        </button>
      </div>
    </div>
  );
};

export default TopicsChat;
