import { dashboardConstants } from "../constants";

const initialState = {
  loading: true,
  items: [],
  item: [],
};

export function dashboard(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case dashboardConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case dashboardConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.dashboard,
      };
    case dashboardConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}
