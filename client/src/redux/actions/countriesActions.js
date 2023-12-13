import {
  GET_ALL_COUNTRIES,
  FILTER_USERS_BY_COUNTRY,
  CLEAR_FILTERED_USERS,
} from "../action_types/countriesActionTypes";
import { API_URL } from "../../firebase-config";

import axios from "axios";

export const getAllCountries = () => async (dispatch) => {
  try {
    const response = await axios(`${API_URL}/getcountries`);
    const countriesData = response.data;
    // console.log(countriesData)

    dispatch({
      type: GET_ALL_COUNTRIES,
      payload: countriesData,
    });
  } catch (error) {
    window.alert(error);
  }
};

export const filterUsersByCountry = (users, country) => (dispatch) => {
  const usersMatchingCountry = country
    ? users.filter((user) => user.cca2 === country)
    : users;

  dispatch({
    type: FILTER_USERS_BY_COUNTRY,
    payload: usersMatchingCountry,
  });
};

export const clearFilteredUsers = () => (dispatch) => {
  dispatch({
    type: CLEAR_FILTERED_USERS,
  });
};
