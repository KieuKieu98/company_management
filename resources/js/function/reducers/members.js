import { overtimeConstants } from "../constants";

export function members(state = {}, action) {
  switch (action.type) {
    case overtimeConstants.MEMBER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case overtimeConstants.MEMBER_SUCCESS:
      return {
        ...state,
        items: action.members
      };
    case overtimeConstants.MEMBER_FAILURE:
      return {
        error: action.error
      };

    default:
      return state;
  }
}
