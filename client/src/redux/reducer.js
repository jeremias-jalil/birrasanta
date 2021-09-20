import { LOGIN_SUCCES, UPDATE, LOGOUT } from "./constant";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
  update: true
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCES: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    case UPDATE: {
      return {
        ...state,
        update: !state.update
      };
    }
    case LOGOUT: {
      return {
        ...state,
        userToken: "",
        userInfo: {},
      };
    }
    default:
      return state;
  }
}


