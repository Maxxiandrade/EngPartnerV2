import style from './CreateNewRoom.module.css'

import logo from "../../assets/logo.png";
import crown from "../../assets/svg/crown.svg";
import connect from "../../assets/svg/connect.svg";
import logOut from "../../assets/svg/logout.svg";
import chat from "../../assets/svg/chat.svg"
import group from "../../assets/svg/group.svg"
import report from "../../assets/svg/report.svg"
import verify from '../../assets/svg/verify.svg'


import { useEffect, useState } from "react";
import { getFriends, getMyUser } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../firebase-config";
import { CreateRoom } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { signOut } from "firebase/auth";




const CreateNewRooms = ({ setIsAuth }) => {
  const vip = useSelector(state => state.users.isVip)
  const admin = useSelector((state) => state.users.isAdmin)
  const userPhoto = useSelector((state) => state.users.photo);
  const [colum, setColumn] = useState(false)



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
        members: [...members, { id: uid }],
      };
      console.log(newGroup);

      await axios.post(`http://localhost:3001/createRoom`, newGroup)
      dispatch(getMyUser(uid))
      setMembers([]);
      setGroupName('');
    } else {
      console.log('Debe ingresar al menos un miembro y un nombre de grupo.');
    }
  };


  const cookies = new Cookies();

  const handleLogOut = async () => {
    const uid = auth.currentUser.uid
    axios.put('http://localhost:3001/geton', { uid, is: "off" })
    cookies.remove("auth-token");
    localStorage.removeItem("uid");
    await signOut(auth);
    setIsAuth(false);
    dispatch(clearUserDataInLogout());
  };





  return (
    <div className={style.createNewRoomsDiv}>
      <nav className={style.nav}>
        <Link to="/home">
          <img src={logo} alt="Home" className={style.logo} />
        </Link>
        <div className={style.navBtns}>
          <Link to='/messages'>
            <button className={style.chatBtn}><img src={chat} alt="chat" className={style.icon} /></button>
          </Link>
          <Link to='/connect'>
            <button className={style.connectBtn}>
              <img src={connect} alt="connect" className={style.icon} />
            </button>
          </Link>
          <Link to='/premium'>
            <button className={style.premium}>
              <img src={crown} alt="" className={style.icon} />
            </button>
          </Link>
          <img src={userPhoto} alt="" className={style.userPhoto} onClick={() => setColumn(!colum)} />
          {colum ?
            <ul className={style.column}>
              <li className={style.li}>
                <Link to={`/profile/${uid}`}>
                  <div className={style.dropDownDiv}>
                    <img src={userPhoto} alt="" className={style.userPhoto2} />
                    <span className={style.dropDownSpan}>Profile</span>
                  </div>
                </Link>
              </li>
              {vip ?
                <li className={style.li}>
                  <Link to='/CreateRoom'>
                    <div className={style.dropDownDiv}>
                      <img src={group} alt="group" className={style.icon} />
                      <span className={style.dropDownSpan}>Create Room</span>
                    </div>
                  </Link>
                </li> : ""}
              <li className={style.li}>
                <div className={style.dropDownDiv} onClick={handleLogOut}>
                  <img src={logOut} alt="logout" className={style.icon} />
                  <span className={style.dropDownSpan}><b>Logout</b></span>
                </div>
              </li>
            </ul> : ''}

        </div>
      </nav>
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
                  <img src={friend.photo} alt="" className={style.photo} />
                  {friend.user}
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
      </aside>
    </div>
  );
};

export default CreateNewRooms;


