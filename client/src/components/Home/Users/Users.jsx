/* eslint-disable react/jsx-key */
// STYLES
import styles from "./Users.module.css";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnline, getMyUser } from "../../../redux/actions/actions";
import { filterUsersByCountry } from "../../../redux/actions/countriesActions";
import defaultImg from "../../../assets/user-default-pfp.png";

// RENDERS
import Navbar from "../../Navbar/Navbar";
import Searchbar from "../Searchbar/Searchbar";
import GoogleMapComponent from "../../GoogleMap/GoogleMap";

const Users = ({ setIsAuth }) => {
  const users = useSelector((state) => state.users.users);
  const filteredUsers = useSelector((state) => state.countries.filteredUsers);
  const uid = localStorage.getItem("uid");
  const dispatch = useDispatch();
  console.log(users);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    dispatch(getOnline());
    dispatch(getMyUser(uid));
  }, []);

  const onSelectMarker = (user) => {
    setSelectedCountry(user.country);
  };

  const onSelectCountry = async (country) => {
    console.log("Selected Country:", country);
    setSelectedCountry(country);
    await dispatch(filterUsersByCountry(users, country));
  };

  const displayedUsers = selectedCountry ? filteredUsers : users;
  console.log("Displaying Users:", displayedUsers);

  const clearFilter = () => {
    setSelectedCountry(null);
    dispatch(clearFilteredUsers());
  };

  return (
    <div className={styles.connectContainer}>
      <Navbar setIsAuth={setIsAuth} />
      <Searchbar />
      <div className={styles.usersContainer}>
        <h3 className={styles.connectH3}>Find new friends</h3>
        {displayedUsers.length === 0 ? (
          <p>Users not found</p>
        ) : (
          displayedUsers.map((user) => (
            <Link
              key={user.id}
              className={styles.linkContainer}
              to={`/profile/${user.uid}`}
            >
              <div className={styles.userContainer} key={user.id}>
                <div className={styles.userImgContainer}>
                  <img
                    src={
                      typeof user.photo === "string" ? user.photo : defaultImg
                    }
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
            </Link>
          ))
        )}
      </div>
      <button onClick={clearFilter}>Clear</button>
      <GoogleMapComponent
        users={users} // Pasa todos los usuarios al componente del mapa
        onSelectMarker={onSelectMarker}
        onSelectCountry={onSelectCountry}
      />
    </div>
  );
};

export default Users;
