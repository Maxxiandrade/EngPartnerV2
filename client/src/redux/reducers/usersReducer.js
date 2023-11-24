import { GET_ALL_USERS, ERROR_GETTING_USERS } from "../actions/actions";

const initialState = {
  users: [],
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case ERROR_GETTING_USERS:
      return { ...state, error: action.payload };

    default:
      return { ...state };
  }
};

export default usersReducer;
