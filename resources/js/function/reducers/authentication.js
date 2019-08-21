import { userConstants } from "../constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.TOKEN_SUCCESS:
      return {
        success: true
      };
    case userConstants.TOKEN_FAILURE:
      return {
        success: false
      };
    case userConstants.SENDEMAIL_REQUEST:
      return {
        loading:true
      }
    case userConstants.SENDEMAIL_SUCCESS:
      return {
        loading: false
      };
    default:
      return state;
  }
}
