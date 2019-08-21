import { overtimeConstants } from "../constants";

export function memberInTeam(state = {}, action) {
  switch (action.type) {
    case overtimeConstants.GET_MEMBER_IN_TEAM_REQUEST:
      return {
        ...state,
        loading: true
      };
    case overtimeConstants.GET_MEMBER_IN_TEAM_SUCCESS:
      return {
        ...state,
        items: action.memberInTeam
      };
    case overtimeConstants.GET_MEMBER_IN_TEAM_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
