import axios from "axios";

import { GET_ONLINE} from "../action_types/action-types";
import { SET_USER_DATA_REGISTER, SET_USER_DATA_CREATE_PROFILE, CREATE_NEW_USER } from "../action_types/userActionTypes";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const ERROR_GETTING_USERS = "ERROR_GETTING_USERS";


export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/users");

      // Verificar que la propiedad "success" sea true
      if (response.data.success) {
        const users = response.data.users;
        dispatch({ type: GET_ALL_USERS, payload: users });
      } else {
        // Enviar un mensaje de error si "success" es false
        throw new Error("Error fetching users");
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

export const setUserDataCreateProfile = (userData) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_USER_DATA_CREATE_PROFILE,
        payload: userData
      });
      console.log(userData);
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



