// STYLES
import style from './CreateNewRoom.module.css'

import { List, ListItem, IconButton, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import Swal from 'sweetalert2';

// TOOLS
import { API_URL } from '../../firebase-config';
import { useEffect, useState } from "react";
import { getFriends, getMyUser, addRoom, putDeleteRoom } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//RENDERS
import Navbar from "../Navbar/Navbar";




const CreateNewRooms = ({ setIsAuth }) => {


  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState(''); // Nuevo estado para el nombre del grupo
  const friends = useSelector((state) => state.users.friends);
  const uid = localStorage.getItem("uid");
  const rooms = useSelector((state) => state.users.rooms);
  useEffect(() => {
    const uid = localStorage.getItem('uid');
    if (uid) {
      dispatch(getFriends(uid));
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
      Swal.fire({
        title: `Create the room "${groupName}"?`,
        text: `You will create a new room with ${members.length} members: ${members?.map((member) => member.name).join(', ')}`,
        icon: "warning",
        confirmButtonText: "Create",
        confirmButtonColor: "#39b300",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        toast: true,
      }).then(async (result) => {
        if (result.isConfirmed) {

          const newGroup = {
            nameGroup: groupName,
            members: [...members, { id: uid }],
          };

          await axios.post(`${API_URL}/createRoom`, newGroup)
          dispatch(addRoom(groupName));
          Swal.fire({
            title: `New room created successfully, start a new conversation!`,
            icon: "success",
            toast: true,
            timer: 4000,
            showConfirmButton: false,
            showCloseButton: true,
            timerProgressBar: true,
          })
          setMembers([]);
          setGroupName('');
        }
      })

    } else {
      console.log('You must enter at least one member and one group name.');
    }
  };
  const DeleteRoms=(room)=>{
    const obj ={
      room,
      uid,
    }
    dispatch(putDeleteRoom(obj))
   
  }
  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  return (
    <div className={style.createNewRoomsDiv}>
      <Navbar setIsAuth={setIsAuth} />
      <aside className={style.groupCreateContainer}>
        <div className={style.txtH1}>
          <h2>Create custom room:</h2>
        </div>
        <div className={style.inputDiv}>
          <input
            type="text"
            placeholder="Room's name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className={style.inputRoomName}
          />
        </div>
        {friends?.length === 0 ? (
          <p className={style.txt}>Your friend list is empty</p>
        ) : (
          friends?.map((friend) => (
            <div className={style.container} key={friend.uid}>
              <div className={style.userName}>
                <div className={style.nameDiv}>
                  <img src={friend?.photo} alt="" className={style.photo} />
                  {friend?.user}
                </div>
                <div className={style.btnDiv}>
                  <button onClick={() => handleFriendClick(friend)} className={style.addBtn}>
                    {isFriendInMembers(friend) ? 'Delete' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        <div className={style.createBtnDiv}>
          <button onClick={handleCreateRoom} className={style.createBtn}>Create Room</button>
        </div>


        <div style={{ textAlign: 'center' }}>
          <Divider />
          <h2 style={{ margin: '0px', marginTop: '10px' }}>My rooms</h2>
          <List dense={true} sx={{ width: '80%', margin: '0px auto' }}>
            {rooms?.map((room) => (
              <>
                <ListItem
                  secondaryAction={
                    <IconButton onClick={()=>DeleteRoms(room)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    },
                    cursor: 'pointer',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#252b80' }}>
                      <GroupsOutlinedIcon sx={{ color: 'white', backgroundColor: '#252b80' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={room}
                  />
                </ListItem>
              </>
            ))}
          </List>
        </div>



      </aside>
    </div>
  );
};

export default CreateNewRooms;


