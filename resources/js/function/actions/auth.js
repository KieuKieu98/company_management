import { userConstants } from "../constants";
import { authService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";
import { handle } from "./response";
// import { async } from "q";

export const authActions = {
  login,
  logout,
  sendEmail,
  resetPassword,
  validationToken
};

function login(email, password) {
  return async dispatch => {
    dispatch(request({ email }));

    try {
      const user = await authService.login(email, password);
      dispatch(success(user));
      const userToken = localStorage.getItem("user");
      if (JSON.parse(userToken)) {
        history.push("/admin/dashboard");
        // location.href = "/admin/dashboard";
        dispatch(alertActions.success("Login successfully!"));
      }
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
}

function logout() {
  authService.logout();
  return { type: userConstants.LOGOUT };
}

function sendEmail(email) {
  return async dispatch => {
    dispatch(request());
    try {
      const res = await authService.sendEmail(email);
      dispatch(success(res.data.data));
      dispatch(alertActions.success("Sending email successfully!"));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(alertActions.error(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
  function request() {
    return { type: userConstants.SENDEMAIL_REQUEST };
  }
  function success() {
    return { type: userConstants.SENDEMAIL_SUCCESS };
  }
}

function validationToken(token) {
  return async dispatch => {
    try {
      const res = await authService.validationToken(token);
      dispatch(success(res));
    } catch (error) {
      dispatch(failure(error));
      if (error.response.status === 404) {
        dispatch(alertActions.error(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
  function success(res) {
    return { type: userConstants.TOKEN_SUCCESS, res };
  }
  function failure(error) {
    return { type: userConstants.TOKEN_FAILURE, error };
  }
}

function resetPassword(token, new_password) {
  return async dispatch => {
    try {
      const res = await authService.resetPassword(token, new_password);
      history.push("/login");
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(alertActions.error(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
}
