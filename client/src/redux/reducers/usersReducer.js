import { FILTER_BY_SEX, FILTER_BY_VIP, RESET_FILTERS } from "../action_types/filterActionTypes";
import { SET_USER_DATA_REGISTER, SET_USER_DATA_CREATE_PROFILE,GET_ALL_USERS,ERROR_GETTING_USERS,GET_ONLINE,GET_USER_BY_USERNAME } from "../action_types/userActionTypes";

const initialState = {
  allUsers: [],
  users: [],
  user: null,
  error: null,
  uid: '',
  email: '',
  password: '',
  date: null,
  name: '',
  lastname: '',
  user: '',
  userName: "",
  age: '',
  sex: '',
  country: '',
  description: '',
  photo: '',
  friends: {},
  isVip: false,
  isOn: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        allUsers: action.payload
      };

    case SET_USER_DATA_REGISTER:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        uid: action.payload.uid,
        date: action.payload.date
      }

    case SET_USER_DATA_CREATE_PROFILE:
      return {
        ...state,
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
        isOn: action.payload.isOn
      }

    case ERROR_GETTING_USERS:
      return { ...state, error: action.payload };
    
      case GET_ONLINE:
        return{...state, 
          users: action.payload,
          allUsers: action.payload
        }

      case GET_USER_BY_USERNAME:
        return {
          ...state,
          users: [action.payload, ...state.users]
        }

      //filters for searching users
      case FILTER_BY_SEX:
        let filteredBySex
        if(action.payload === "male"){
          filteredBySex = state.allUsers.filter(user=> user.sex === action.payload)
        } else if(action.payload === "female"){
          filteredBySex = state.allUsers.filter(user => user.sex === action.payload)
        } else {
          return {
            ...state,
            users: state.allUsers
          }
        }

        return {
          ...state,
          users: filteredBySex,
        }

        //the vip filter it's the only one that its going to acced to the users state
      case FILTER_BY_VIP:
        let filteredByVip
        
        if(action.payload === "vip"){
          filteredByVip = state.users.filter(user=> user.isVip === true)
        }
        return {
          ...state,
          users: filteredByVip,
        }

        case RESET_FILTERS:
          return {
            ...state,
            users: state.allUsers
          
          }



    
    
        default:
      return { ...state };
  }
};

export default usersReducer;
