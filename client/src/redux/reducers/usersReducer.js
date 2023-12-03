import {
  FILTER_BY_AGE,
  FILTER_BY_VIP,
  RESET_FILTERS,
  FILTER_BY_MALE,
  FILTER_BY_FEMALE,
} from "../action_types/filterActionTypes";

import {
  SET_USER_DATA_REGISTER,
  GET_ALL_USERS,
  ERROR_GETTING_USERS,
  GET_ONLINE,
  GET_USER_BY_USERNAME,
  GET_MY_USER,
  SET_USER_DATA_GOOGLE_ACCOUNT,
  CLEAR_USER_DATA_IN_LOGOUT,
  GET_FRIENDS,
  CHANGE_USER,
  SELECT_REPORT,
} from "../action_types/userActionTypes";

const initialState = {
  allUsers: [],
  users: [],
  error: null,
  uid: "",
  email: "",
  password: "",
  date: null,
  name: "",
  lastname: "",
  user: "",
  age: "",
  sex: "",
  country: "",
  description: "",
  photo: "",
  friends: [],
  reports: [],
  isVip: false,
  isOn: false,
  isAdmin: false,
  emailGoogleAccount: "",
  photoGoogleAccount: "",
  uidGoogleAccount: "",
  //filters
  genderFilter: "both",
  userChat: {},
  chatId: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        allUsers: action.payload,
      };

    case GET_MY_USER:
      console.log("holas reducer");
      return {
        ...state,
        uid: action.payload.uid,
        email: action.payload.email,
        name: action.payload.name,
        lastname: action.payload.lastname,
        sex: action.payload.sex,
        user: action.payload.user,
        country: action.payload.country,
        photo: action.payload.photo,
        description: action.payload.description,
        age: action.payload.age,
        date: action.payload.date,
        friends: action.payload.friends,
        isVip: action.payload.isVip,
        isAdmin: action.payload.isAdmin,
        isOn: action.payload.isOn,
      };

    case SET_USER_DATA_REGISTER:
      return {
        ...state,
        uid: action.payload.uid,
        email: action.payload.email,
        date: action.payload.date,
        name: action.payload.name,
        lastname: action.payload.lastname,
        user: action.payload.user,
        age: action.payload.age,
        sex: action.payload.sex,
        country: action.payload.country,
        description: action.payload.description,
        photo: action.payload.photo,
        friends: action.payload.friends,
        isVip: action.payload.isVip,
        isOn: action.payload.isOn,
        isAdmin: action.payload.isAdmin,
      };

    case SET_USER_DATA_GOOGLE_ACCOUNT:
      return {
        ...state,
        emailGoogleAccount: action.payload.email,
        photoGoogleAccount: action.payload.photo,
        uidGoogleAccount: action.payload.uid,
      };

    case CLEAR_USER_DATA_IN_LOGOUT:
      return {
        ...state,
        uid: "",
        email: "",
        password: "",
        date: null,
        name: "",
        lastname: "",
        user: "",
        age: "",
        sex: "",
        country: "",
        description: "",
        photo: "",
        friends: [],
        isVip: false,
        isOn: false,
        isAdmin: false,
        emailGoogleAccount: "",
        photoGoogleAccount: "",
        uidGoogleAccount: "",
      };

    case ERROR_GETTING_USERS:
      return { ...state, error: action.payload };

    case GET_ONLINE:
      return { ...state, users: action.payload, allUsers: action.payload };

    case GET_USER_BY_USERNAME:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };

    //filters for searching users
    case FILTER_BY_MALE:
      const maleResults = state.allUsers.filter((user) => user.sex === "male")
      return {
        ...state,
        genderFilter: "male",
        users: maleResults,
      };

    case FILTER_BY_FEMALE:
      const femaledResults = state.allUsers.filter((user) => user.sex === "female")
      return {
        ...state,
        genderFilter: "female",
        users: femaledResults,
      };

    case FILTER_BY_VIP:
      let filteredVip
      filteredVip = state.users.filter((user) => user.isVip === true)
      console.log(filteredVip)
      return {
        ...state,
        users: filteredVip,
      };

    case FILTER_BY_AGE:
      const age = action.payload;
      const ageFiltered = state.users.filter((user) => user.age === age);
      console.log(ageFiltered)
      return {
        ...state,
        users: ageFiltered,
      };

    case RESET_FILTERS:
      return {
        ...state,
        users: state.allUsers,
      };
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload,
      };
    case CHANGE_USER:
      return {
        ...state,
        userChat: action.payload,
        chatId:
          state.uid > action.payload.uid
            ? state.uid + action.payload.uid
            : action.payload.uid + state.uid,
      };

      //report options
    case SELECT_REPORT:
      return{
        ...state,
        reports: action.payload
      }
    default:
      return { ...state };
  }
};

export default usersReducer;
