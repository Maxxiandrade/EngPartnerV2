import { useEffect, useState } from "react";
import { getFriends, getMyUser } from "../../redux/actions/actions";
import {useSelector, useDispatch } from "react-redux";
import style from '../Home/Friends/Friends.module.css'
import { CreateRoom } from "../../redux/actions/actions";
import axios from "axios";



const CreateNewRooms = () => {
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState(''); // Nuevo estado para el nombre del grupo
  const friends = useSelector((state) => state.users.friends);
  const uid = localStorage.getItem("uid");
  useEffect(() => {
    const uid = localStorage.getItem('uid');
    if (uid) {
      dispatch(getFriends(uid));
      dispatch(getMyUser(uid))
    }
  }, []);

  const handleFriendClick = (friend) => {
    const isMember = members.some((member) => member.id === friend.id);

    if (isMember) {
      setMembers((prevMembers) => prevMembers.filter((member) => member.id !== friend.id));
    } else {
      setMembers((prevMembers) => [...prevMembers, friend]);
    }
  };

  const isFriendInMembers = (friend) => {
    const res = members.some((member) => member.id === friend.id);
    return res;
  };

  const handleCreateRoom = async () => {
    if (members.length > 0 && groupName.trim() !== '') {
      const newGroup = {
        nameGroup: groupName,
        members: [...members,{id:uid}], 
      };
      console.log(newGroup);

      await axios.post(`http://localhost:3001/createRoom`,newGroup)
      setMembers([]);
      setGroupName('');
    } else {
      console.log('Debe ingresar al menos un miembro y un nombre de grupo.');
    }
  };

  return (
    <aside className={style.friendContainer}>
      <div className={style.txtH1}>
        <h2>Add Members:</h2>
      </div>
      {friends?.length === 0 ? (
        <p className={style.txt}>Your friend list is empty</p>
      ) : (
        friends?.map((friend) => (
          <div className={style.container} key={friend.uid}>
            <div className={style.userName}>
              <img src={friend.photo} alt="" className={style.photo} />
              {friend.user}
            </div>
            <div>
              <button onClick={() => handleFriendClick(friend)}>
                {isFriendInMembers(friend) ? 'Eliminar' : 'Agregar'}
              </button>
            </div>
          </div>
        ))
      )}
      <div>
        <input
          type="text"
          placeholder="Nombre del grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={handleCreateRoom}>Crear Room</button>
      </div>
    </aside>
  );
};

export default CreateNewRooms;


