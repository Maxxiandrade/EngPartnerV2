import React from 'react'
import style from './PrivateChat.module.css'
import M from '../../../assets/M.jpg'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Navbar = () => {
    
    const user = useSelector(state=>state.users.user)
    const photo = useSelector(state=>state.users.photo)

  return (
    <div className={style.navbar}>
        <div className={style.userdiv}>
            <img src={photo} alt="" className={style.img}/>
            <span className={style.userName}>{user}</span>
        </div>
    </div>
  )
}

export default Navbar