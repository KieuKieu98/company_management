import { alertActions } from "./";
import { authActions } from "./auth";
import { history } from "../helpers";
export const handle = {
  handleResponse
};

function handleResponse(error, dispatch) {
  if (error.response) {
    if (error.response.status === 401) {
      dispatch(authActions.logout());
      history.push("/login");
    }
    const { data } = error.response;
    let messages = "";
    delete data.status;
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[key])) {
        data[key].forEach(key2 => {
          messages = `${messages}<div>${key2}</div>`;
        });
      } else {
        messages = `${messages}<div>${data[key]}</div>`;
      }
      dispatch(alertActions.error(messages));
    });
  } else {
    dispatch(alertActions.error("An unknown error"));
  }
}
