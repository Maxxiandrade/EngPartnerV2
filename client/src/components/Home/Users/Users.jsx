// STYLES
import styles from "./Users.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnline, getMyUser } from "../../../redux/actions/actions";

import defaultImg from "../../../assets/user-default-pfp.png";

// RENDERS
import Navbar from "../../Navbar/Navbar";
import Searchbar from "../Searchbar/Searchbar";

const Users = ({ setIsAuth }) => {
  const users = useSelector((state) => state.users.users);
  const uid = localStorage.getItem("uid");
  const dispatch = useDispatch();
  console.log(users);

  useEffect(() => {
    dispatch(getOnline());
    dispatch(getMyUser(uid));
  }, []);

  return (
    <div className={styles.connectContainer}>
      <Navbar setIsAuth={setIsAuth} />
      <Searchbar />
      <div className={styles.usersContainer}>
        <h3 className={styles.connectH3}>Find new friends</h3>
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
                  <p>({user.user})</p>
                  <p className={styles.age}>{user.age}</p>
                </div>
                <div className={styles.restPropsContainer}>
                  <p>{user.country}</p>
                  <p>{user.sex}</p>
                  <div className={styles.isOnContainerrr}>
                    {user.isOn ? (
                      <span className={styles.spannn}>🟢</span>
                    ) : (
                      <span className={styles.spannn}>🔴</span>
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
