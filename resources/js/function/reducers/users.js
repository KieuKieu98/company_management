import { userConstants } from "../constants";

const init = {
  user: {},
  detail: {},
  pages: {
    activePage: 1,
    itemsCountPerPage: 1,
    totalItemsCount: 1,
    pageRangeDisplayed: 5
  }
};

export function users(state = init, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        pages: {
          activePage: action.current_page,
          itemsCountPerPage: action.per_page,
          totalItemsCount: action.total,
          pageRangeDisplayed: state.pages.pageRangeDisplayed
        },
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.GETONE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETONE_SUCCESS:
      return {
        ...state,
        detail: action.users.user
      };
    case userConstants.GETME_SUCCESS:
      return {
        ...state,
        user: action.users.user
      };
    case userConstants.GETONE_FAILURE:
      return {
        error: action.error
      };
    case userConstants.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case userConstants.UPDATE_USER_FAILURE:
      return {
        error: action.error
      };
    case userConstants.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(x => x.id !== action.id)
      };
    default:
      return state;
  }
}
