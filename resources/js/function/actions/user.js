import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";
import { handle } from "./response";

export const userActions = {
  getAll,
  getOne,
  updateUser,
  createUser,
  deleteUser
};

function createUser(userAdd) {
  return async dispatch => {
    try {
      const user = await userService.createUser(userAdd);
      dispatch(alertActions.success("Adding successfully!"));
      history.push("/admin/table-user");
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
}

function deleteUser(id) {
  return async dispatch => {
    dispatch(request(id));
    try {
      await userService.deleteUser(id);
      dispatch(alertActions.success("Deleting successfully!"));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function request(id) {
    return { type: userConstants.DELETE_ITEM, id };
  }
}

function getAll(pageNumber) {
  return async dispatch => {
    // dispatch(request());
    try {
      const user = await userService.getAll(pageNumber);
      dispatch(
        success(
          user.data.data,
          user.data.current_page,
          user.data.per_page,
          user.data.total
        )
      );
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  // function request() {
  //   return { type: userConstants.GETALL_REQUEST };
  // }
  function success(users, current_page, per_page, total) {
    return {
      type: userConstants.GETALL_SUCCESS,
      users,
      current_page,
      per_page,
      total
    };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function getOne(id, me = false) {
  return async dispatch => {
    dispatch(request());
    try {
      const user = await userService.getOne(id);
      dispatch(me ? successMe(user.data) : success(user.data));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function request() {
    return { type: userConstants.GETONE_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETONE_SUCCESS, users };
  }
  function successMe(users) {
    return { type: userConstants.GETME_SUCCESS, users };
  }
}

function updateUser(user_fields) {
  return async dispatch => {
    // dispatch(request(user_fields));
    try {
      const response = await userService.updateUser(user_fields);
      dispatch(success(response.data));
      dispatch(alertActions.success("Updating successfully!"));
      {
        history.location.pathname === "/admin/user"
          ? history.push("/admin/dashboard")
          : history.push("/admin/table-user");
      }
      // history.push("/admin/table-user");
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error("Updating Fail!"));
      history.push(`/admin/table-user/${user_fields.id}/edit`);
    }
  };

  // function request(user_fields) {
  //   return { type: userConstants.UPDATE_USER_REQUEST, user_fields };
  // }
  function success(user_fields) {
    return { type: userConstants.UPDATE_USER_SUCCESS, user_fields };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_USER_FAILURE, error };
  }
}
