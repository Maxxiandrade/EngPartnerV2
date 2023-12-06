import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserByUserName } from "../../../redux/actions/actions";

import styles from "./searchbar.module.css";
import Filters from "../../Filters/Filters";

const Searchbar = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (userName === "") {
      window.alert("you need to type a username");
    } else {
      dispatch(getUserByUserName(userName));
    }
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.inputAndBtnContainer}>
        <input
          type="search"
          placeholder="EngPartner Name"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <Filters />
    </nav>
  );
};

export default Searchbar;
