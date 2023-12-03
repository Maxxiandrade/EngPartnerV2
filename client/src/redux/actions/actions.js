import axios from "axios";
import { SET_USER_DATA_REGISTER,
CREATE_NEW_USER,
GET_ONLINE,
GET_ALL_USERS,
ERROR_GETTING_USERS,
GET_USER_BY_USERNAME,
GET_MY_USER,
SET_USER_DATA_GOOGLE_ACCOUNT,
CLEAR_USER_DATA_IN_LOGOUT,
EDIT_USER,
GET_FRIENDS,
CHANGE_USER,
GET_REPORTED
 } from "../action_types/userActionTypes";




export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/users");
      if (data) {
        dispatch({ type: GET_ALL_USERS, payload: data });
      } else {
        throw new Error("Error fetching all users");
      }
    } catch (error) {
      dispatch({ type: ERROR_GETTING_USERS, payload: error.message });
    }
  };
};

export const setUserDataRegister = (userData) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_USER_DATA_REGISTER,
        payload: userData
      });
    } catch (error) {
      throw Error(error)
    }
  }
}

export const setUserDataGoogleAccount = (googleData) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_USER_DATA_GOOGLE_ACCOUNT,
        payload: googleData
      });
    } catch (error) {
      throw Error(error)
    }
  }
}

export const clearUserDataInLogout = () => {
  return async function (dispatch) {
    try {
      dispatch({
        type: CLEAR_USER_DATA_IN_LOGOUT
      });
    } catch (error) {
      throw Error(error)
    }
  }
}
export const createNewUser = (userData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/createuser", userData);
      dispatch({
        type: CREATE_NEW_USER,
        payload: response
      })
      console.log(response);
    } catch (error) {
      throw Error(error)
    }
  }
}

export const getOnline = ()=>async(dispatch)=>{
    try {
      const {data} = await axios.get('http://localhost:3001/getonline')
      if(data){
        dispatch({type: GET_ONLINE, payload: data})
      }
    } catch (error) {
      throw Error(error)
    }
  };



export const getUserByUserName = (name)=> async(dispatch)=>{
  try {
    const {data} = await axios(`http://localhost:3001/user?user=${name}`)
    console.log(data)

    dispatch({
      type: GET_USER_BY_USERNAME,
      payload: data
    })
    
  } catch (error) {
    window.alert(`error when searching this user by id: ${error}`)
  }
}
export const getMyUser = (uid)=> async(dispatch)=>{
  try {
    const myUid = {uid:uid}
    console.log(myUid)
    const {data} = await axios.post('http://localhost:3001/user',myUid)
    console.log(data)
      dispatch({
        type: GET_MY_USER,
        payload: data
      })
  } catch (error) {
    throw Error(error)
  }
};

export const editUser = ({uid, name, lastname, description})=>async()=>{
  try {
    axios.put("http://localhost:3001/edit", {uid, name, lastname, description})
  } catch (error) {
    throw Error(error)
  }
}

export const handleUser = ({uid, friendId}, action)=>async()=>{
  try {
    axios.put("http://localhost:3001/friend", {uid, friendId, action})
  } catch (error) {
    throw Error(error)
  }
};

export const getFriends = (uid)=>async(dispatch)=>{
  try {
    
    const {data} = await axios.get(`http://localhost:3001/friends?uid=${uid}`)
    dispatch({
      type:GET_FRIENDS,
      payload: data
    })
  } catch (error) {
    throw Error(error)
  }
};

export const chatReducer = (id)=>(dispatch)=>{
      dispatch({
        type: CHANGE_USER,
        payload: id
      })
}

export const getReported = ()=>async(dispatch)=>{
  try{
      const {data} = await axios.get('http://localhost:3001/reported')
      dispatch({
        type: GET_REPORTED,
        payload: data
      })
    }catch(error){
      throw Error(error)
    }
}