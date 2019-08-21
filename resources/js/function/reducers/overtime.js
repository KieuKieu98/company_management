import { overtimeConstants } from "../constants";

const init = {
  items: {
    data: []
  },
  pages: {
    activePage: 1,
    itemsCountPerPage: 1,
    totalItemsCount: 1,
    pageRangeDisplayed: 5
  }
};

export function overtimes(state = init, action) {
  switch (action.type) {
    case overtimeConstants.GET_ALL_MEMBER_IN_TEAM_OT_SUCCESS:
      return {
        ...state,
        pages: {
          activePage: action.current_page,
          itemsCountPerPage: action.per_page,
          totalItemsCount: action.total,
          pageRangeDisplayed: state.pages.pageRangeDisplayed
        },
        items: action.getOTMembers
      };

    case overtimeConstants.ADD_OVERTIME:
      return {
        ...state,
        items: {
          ...state.items,
          data: [action.member, ...state.items.data]
        }
      };

    case overtimeConstants.GETALL_OT_SUCCESS:
      return {
        ...state,
        pages: {
          activePage: action.current_page,
          itemsCountPerPage: action.per_page,
          totalItemsCount: action.total,
          pageRangeDisplayed: state.pages.pageRangeDisplayed
        },
        allMemberOT: action.overtimes
      };

    case overtimeConstants.GET_OT_ONE_USER_SUCCESS:
      return {
        ...state,
        pages: {
          activePage: action.getOTMember.current_page,
          itemsCountPerPage: action.getOTMember.per_page,
          totalItemsCount: action.getOTMember.total,
          pageRangeDisplayed: state.pages.pageRangeDisplayed
        },
        allMemberOT: action.getOTMember
      };

    case overtimeConstants.GET_ONE_MEMBER_OT_IN_TEAM_SUCCESS:
      return {
        ...state,
        items: action.getOneMemberOT
      };

    default:
      return state;
  }
}
