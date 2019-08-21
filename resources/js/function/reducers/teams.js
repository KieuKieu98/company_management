import { overtimeConstants } from "../constants";

const initialState = {
  items: [],
  detail: [],
  team: {}
};
export function teams(state = initialState, action) {
  switch (action.type) {
    case overtimeConstants.GETALL_TEAM_REQUEST:
      return {
        loading: true
      };
    case overtimeConstants.GETALL_TEAM_SUCCESS:
      return {
        ...state,
        items: action.teams
      };
    case overtimeConstants.GETALL_TEAM_FAILURE:
      return {
        error: action.error
      };
    case overtimeConstants.ADD_TEAM:
      return {
        ...state,
        items: [action.teams, ...state.items]
      };
    case overtimeConstants.DELETE_TEAM:
      return {
        ...state,
        items: state.items.filter(x => x.id !== action.id)
      };
    case overtimeConstants.GETONE_TEAM_REQUEST:
      return {
        ...state,
        loading: true
      };

    case overtimeConstants.GETONE_TEAM_SUCCESS:
      return {
        ...state,
        detail: action.team
      };

    case overtimeConstants.ADD_MEMBER:
      return {
        ...state,
        detail: {
          ...state.detail,
          members: [action.member, ...state.detail.members]
        }
      };
    case overtimeConstants.DELETE_MEMBER_ITEM:
      return {
        ...state,
        items: state.items.filter(x => x.id !== action.id)
      };
    case overtimeConstants.DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        detail: {
          ...state.detail,
          members: state.detail.members.filter(x => x.id !== action.member.id)
        }
      };

    default:
      return state;
  }
}
