import { overtimeConstants } from "../constants";

const initialState = {
  items: {}
};
export function updateOT(state = initialState, action) {
  switch (action.type) {
    case overtimeConstants.UPDATE_OVERTIME_SUCCESS:
      return {
        ...state,
        items: action.updateOTMember
      };
    default:
      return state;
  }
}
