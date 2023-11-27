import { SET_USER_DATA_REGISTER,
   SET_USER_DATA_CREATE_PROFILE,
   GET_ALL_USERS,
   ERROR_GETTING_USERS,
   GET_ONLINE,
   GET_USER_BY_USERNAME, 
   GET_MY_USER} from "../action_types/userActionTypes";

const initialState = {
  users: [],
  error: null,
  uid: '',
  email: '',
  password: '',
  date: null,
  name: '',
  lastname: '',
  user: '',
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
      };

    case GET_MY_USER:
      console.log('holas reducer')
      return{
        ...state,
        uid: action.payload.uid,
        name: action.payload.name,
        lastname: action.payload.lastname,
        sex: action.payload.sex,
        user: action.payload.user,
        country: action.payload.country,
        photo: action.payload.photo,
        description: action.payload.description,
        age: action.payload.age
        
      }

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
        return{...state, users: action.payload}

      case GET_USER_BY_USERNAME:
        return {
          ...state,
          users: [action.payload, ...state.users]
        }
    
    
        default:
      return { ...state };
  }
};

export default usersReducer;
