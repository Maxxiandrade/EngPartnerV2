import {
  GET_ALL_COUNTRIES,
  FILTER_USERS_BY_COUNTRY,
  CLEAR_FILTERED_USERS,
} from "../action_types/countriesActionTypes";

const initialState = {
  countries: [],
  allCountries: [],
  filteredUsers: [],
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case FILTER_USERS_BY_COUNTRY:
      return {
        ...state,
        filteredUsers: action.payload,
      };
    case CLEAR_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: [],
      };
    default:
      return state;
  }
};

export default countriesReducer;
