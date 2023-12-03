import style from './PrivateChat.module.css'
import M from '../../../assets/M.jpg'
import { useState } from 'react';
import {collection, query, where, getDocs, updateDoc, serverTimestamp, getDoc, doc, setDoc} from "firebase/firestore"
import {db} from '../../../firebase-config'
import { useSelector } from 'react-redux';

const Search = ()=>{

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false)

    const uid = useSelector((state)=>state.users.uid)
    const photo = useSelector((state)=>state.users.photo)
    const currentUser = useSelector((state)=>state.users.user)

    const handleSearch = async()=>{
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, where("user", "==", username))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc)=>{
                setUser(doc.data())
            })
        } catch (error) {
            setErr(true)
        }
    }

    const handleKey = e=>{
        if (e.keyCode === 13) { 
            handleSearch();
        }
    }

    const handleSelect = async()=>{
        //verificar si el grupo (chats en firestore) existe, si no existe que lo cree
        const combinedId = uid > user.uid ? uid + user.uid : user.uid + uid 
        try {
            const res = await getDoc(doc(db,"chats", combinedId ));
            if(!res.exists()){
                //crear chat en la coleccion
                await setDoc(doc(db, "chats", combinedId),{messages:[]})
                //crear user chats
                await updateDoc(doc(db, "userChats", uid),{
                    [combinedId+".userInfo"]:{
                        uid: user.uid,
                        user: user.user,
                        photo: user.photo
                    },
                    [combinedId+".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, "userChats", user.uid),{
                    [combinedId+".userInfo"]:{
                        uid: uid,
                        user: currentUser,
                        photo: photo
                    },
                    [combinedId+".date"]: serverTimestamp()
                })
            }else{
                await setDoc(doc(db, "chats", combinedId),{messages:[]})
                await updateDoc(doc(db, "userChats", uid),{
                    [combinedId+".userInfo"]:{
                        uid: user.uid,
                        user: user.user,
                        photo: user.photo
                    },
                    [combinedId+".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, "userChats", user.uid),{
                    [combinedId+".userInfo"]:{
                        uid: uid,
                        user: currentUser,
                        photo: photo
                    },
                    [combinedId+".date"]: serverTimestamp()
                })
            }
        } catch (error) {
            throw Error(error)    
        }

    }

    return(
        <div className={style.search}>
            <div className={style.searchForm}>
            <input type="text" className={style.input} placeholder='Find a user by username...' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} />
            </div>
            {err && <span> User not found</span>}
            {user && <div className={style.userChat} onClick={handleSelect}>
                <img src={user.photo} alt="" className={style.img}/>
                <div className={style.userChatInfo}>
                    <span>{user.user}</span>
                </div>
            </div>}
        </div>
    )
};

export default Search