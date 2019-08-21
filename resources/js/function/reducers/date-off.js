import { dateOffConstants } from "../constants";

const init = {
  data: []
};

export function dateOffs(state = init, action) {
  switch (action.type) {
    case dateOffConstants.CREATE_DATE_OFF:
      return {
        ...state,
        data: [action.dateOff, ...state.data]
      };
    case dateOffConstants.GET_DATEOFF_REQUEST:
      return {
        loading: true
      };
    case dateOffConstants.GET_DATEOFF_SUCCESS:
      return {
        ...state,
        data: action.dateOff
      };
    case dateOffConstants.GET_DATEOFF_ACCEPT_SUCCESS:
      return {
        ...state,
        dateOffAccept: action.dateOff
      };
    case dateOffConstants.DELETE_DATEOFF:
      return {
        ...state,
        data: state.data.filter(x => x.id !== action.id)
      };
    default:
      return state;
  }
}
