import style from "./PrivateChat.module.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

const PrivateChat = ()=>{
    return(
        <div className={style.home}>
            <nav>
                
            </nav>
           <div className={style.container}>
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
};

export default PrivateChat;