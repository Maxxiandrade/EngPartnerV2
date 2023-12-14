import {useRef } from "react";
import style from "./TopicsChat.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { getFlagByCode } from "../../../utils/getFlagByCode";

const TopicsChat = ({ setingValueRoom, languageChecked, setLanguageChecked, handleChangeSwitch }) => {
  const roomInputRef = useRef(null);
  const country = useSelector(state=> state.users?.country)
  const Myrooms = useSelector(state=> state.users?.rooms)
  const language = useSelector(state=> state.users?.language)
  const languageRead = useSelector(state=> state.users?.languageRead)
  const isVip = useSelector(state=> state.users?.isVip)
  console.log(country);
  
  const [rooms,setRooms]= useState(['Global','Sport','Animals',"Food",'Tech', country, ...Myrooms ])

  const handleTopic = (e)=>{
    const topic = e.target.value
    const selectedRoom = topic === 'null' ? null : topic !== '' ? topic : roomInputRef.current.value;
    setingValueRoom(selectedRoom);
  }

  useEffect(()=>{
    setRooms(['Global','Sport','Animals',"Food",'Tech', country, ...Myrooms ])
  }, [country, Myrooms])

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 63,
    height: 30,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(2px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(32px)',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor:'#042c54',
      border: '2px solid #3c70a3',
      borderRadius: '50%',
      width: 24,
      height: 24,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  return (
      <div className={style.room}>
        <label htmlFor="roomSelect"></label>
        <section >
          <select id="roomSelect" onChange={handleTopic} className={style.selectStyle}>
            {rooms.map(room=>{
              return <option value={room.toLowerCase()} key={room} className={style.optionStyle}> {room} </option>
              })}
          </select>

          {!isVip && 
            <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap', fontSize: '30px', justifyContent: 'center' }}>
              <div>{getFlagByCode(language)}</div>
                <MaterialUISwitch checked={languageChecked} onChange={handleChangeSwitch} />
              <div>{getFlagByCode(languageRead)}</div>
            </div>
          }
          
        </section>
      </div>
  );
};

export default TopicsChat;
