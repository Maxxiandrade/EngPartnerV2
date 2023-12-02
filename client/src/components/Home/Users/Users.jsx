// eslint-disable-next-line no-unused-vars
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnline } from "../../../redux/actions/actions";

import defaultImg from "../../../assets/user-default-pfp.png";

import PrivateChat from "../../Chats/PrivateChat/PrivateChat"
import Searchbar from "../Searchbar/Searchbar";

import styles from "./Users.module.css";

const Users = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  console.log(users);

  useEffect(() => {
    dispatch(getOnline());
  }, []);

  return (
    <div className={styles.connectContainer}>
      <Searchbar />
      <div className={styles.usersContainer}>
        <h3>Find new friends</h3>
        {users.length === 0 ? (
          <p>Users not found</p>
        ) : (
          users.map((user) => (
            <div className={styles.userContainer} key={user.id}>
              <div className={styles.userImgContainer}>
                <img
                  src={typeof user.photo === "string" ? user.photo : defaultImg}
                  alt="default image"
                />
              </div>
              <div className={styles.textContainer}>
                <div className={styles.nameAndVipContainer}>
                  <p>{user.name}</p>
                  <p>vip</p>
                </div>
                <div className={styles.restPropsContainer}>
                  <p>{user.country}</p>
                  <p>{user.sex}</p>
                  <div>
                    {user.isOn ? (
                      <span
                        role="img"
                        aria-label="Online"
                        style={{ color: "green" }}
                      >
                        🟢
                      </span>
                    ) : (
                      <span
                        role="img"
                        aria-label="Offline"
                        style={{ color: "red" }}
                      >
                        🔴
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Users;
