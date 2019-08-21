import { dateOffConstants } from "../constants";
import { dateOffService } from "../services";
import { alertActions } from "./";
import { handle } from "./response";
import { KeyObject } from "crypto";

export const dateOffActions = {
  createDateOff,
  getWaitingDateOff,
  getAcceptDateOff,
  deleteDateOff
};

function createDateOff(data) {
  return async dispatch => {
    try {
      const dateOff = await dateOffService.createDateOff(data);
      dispatch(success(dateOff.data.data));
      dispatch(alertActions.success("Adding successfully!"));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function success(dateOff) {
    return { type: dateOffConstants.CREATE_DATE_OFF, dateOff };
  }
}

function getWaitingDateOff() {
  return async dispatch => {
    dispatch(request());
    try {
      const dateOff = await dateOffService.getWaitingDateOff();
      dispatch(success(dateOff.data.data));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function request() {
    return { type: dateOffConstants.GET_DATEOFF_REQUEST };
  }
  function success(dateOff) {
    return { type: dateOffConstants.GET_DATEOFF_SUCCESS, dateOff };
  }
}

function getAcceptDateOff() {
  return async dispatch => {
    try {
      const dateOff = await dateOffService.getAcceptDateOff();
      dispatch(success(dateOff.data.data));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };

  function success(dateOff) {
    return { type: dateOffConstants.GET_DATEOFF_ACCEPT_SUCCESS, dateOff };
  }
}

function deleteDateOff(id) {
  return async dispatch => {
    dispatch(request(id));
    try {
      await dateOffService.deleteDateOff(id);
      dispatch(alertActions.success("Deleting successfully!"));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function request(id) {
    return { type: dateOffConstants.DELETE_DATEOFF, id };
  }
}
