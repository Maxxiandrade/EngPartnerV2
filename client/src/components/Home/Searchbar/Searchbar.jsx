import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { getUserByUserName } from '../../../redux/actions/actions';

import styles from './searchbar.module.css'
import Filters from '../../Filters/Filters';

const Searchbar = ()=>{
    const [userName, setUserName] = useState("")
    const dispatch = useDispatch()

    const user = useSelector(state => state.users.user)
    console.log(user)

    const handleSearch = ()=>{
        if(userName === ""){
            window.alert("you need to type a userId")
        } else {
            dispatch(getUserByUserName(userName))
        }
    }
    return (
        <nav className={styles.nav}>
                <input 
                type="search" 
                placeholder="EngPartner ID"
                value={userName}
                onChange={(event)=> setUserName(event.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <Filters/>
        </nav>
    )
}

export default Searchbar