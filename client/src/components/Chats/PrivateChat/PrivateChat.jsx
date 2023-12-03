import style from "./PrivateChat.module.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Friends from "../../Home/Friends/Friends";
const PrivateChat = ()=>{
    return(
        <div className={style.home}>
            <nav>
                
            </nav>
           <div className={style.container}>
                <Sidebar/>
                <Chat/>
            </div>
            <div className={style.friendsComp}>
              <Friends />
            </div>
        </div>
    )
};

export default PrivateChat;