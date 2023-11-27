// eslint-disable-next-line no-unused-vars
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnline } from "../../../redux/actions/actions";

import defaultImg from '../../../assets/user-default-pfp.png'

import Searchbar from "../Searchbar/Searchbar";

import styles from './Users.module.css'

const Users = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnline());
  }, [dispatch]);

  return (
    <div className={styles.connectContainer}>
    <Searchbar/>
      <div className={styles.usersContainer}>
      <h3>Online Users</h3>
        { users.map((user) => (
            <div         
            className={styles.userContainer} 
            key={user.id}>
              <div className={styles.userImgContainer}>
                <img src={typeof user.photo === 'string' ? user.photo: defaultImg} alt="default image" />
              </div>
              <div className={styles.textContainer}>
              <p>{user.name}</p>
              <p>{user.country}</p>
              <p>{user.sex}</p>

              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
