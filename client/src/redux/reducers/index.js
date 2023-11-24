import { combineReducers } from "redux";
import countriesReducer from "./countriesReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  countries: countriesReducer,
  users: usersReducer,
});

export default rootReducer;
