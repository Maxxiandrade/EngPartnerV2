import React from 'react'
import style from './PrivateChat.module.css'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'


const Sidebar = () => {
  return (
    <div className={style.sidebar}>
        <Navbar/>
        <Search/>
        <Chats/>
        </div>
  )
}

export default Sidebar