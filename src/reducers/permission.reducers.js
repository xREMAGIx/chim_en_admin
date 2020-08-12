import { permissionConstants } from "../constants";

const initialState = {
  loading: true,
  items: [],
  item: [],
  count: null,
  next: null,
  previous: null,
};

export function permissions(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case permissionConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case permissionConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.permissions.results,
        count: action.permissions.count,
        next: action.permissions.next,
        previous: action.permissions.previous,
        success: true,
      };
    case permissionConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    //Non-pagination
    // Get Reducers
    case permissionConstants.GETALL_NONPAGINATION_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case permissionConstants.GETALL_NONPAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.permissions,
        count: action.permissions.count,
        next: action.permissions.next,
        previous: action.permissions.previous,
        success: true,
      };
    case permissionConstants.GETALL_NONPAGINATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case permissionConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case permissionConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.permissions,
        success: true,
      };
    case permissionConstants.GETBYID_ERROR:
      return { ...state, error: action.error, loading: false };

    //Add reducers
    case permissionConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case permissionConstants.ADD_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.permission],
        item: [],
        loading: false,
        success: true,
      };
    case permissionConstants.ADD_FAILURE:
      return { ...state, error: action.error, loading: false };

    //Update reducers
    case permissionConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case permissionConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
        loading: false,
        success: true,
      };
    case permissionConstants.UPDATE_FAILURE:
      return { ...state, error: action.error, loading: false };

    //Delete reducers
    case permissionConstants.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        items: state.items.map((permission) =>
          permission.id === action.id
            ? { ...permission, deleting: true }
            : permission
        ),
      };
    case permissionConstants.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: state.items.filter((permission) => permission.id !== action.id),
      };
    case permissionConstants.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: state.items.map((permission) => {
          if (permission.id === action.id) {
            const { deleting, ...permissionCopy } = permission;
            return { ...permissionCopy, deleteError: action.error };
          }

          return permission;
        }),
      };

    default:
      return state;
  }
}
