import { categoryConstants } from "../constants";

const initialState = {
  loading: true,
  items: [],
  item: [],
  count: null,
  next: null,
  previous: null,
};

export function categories(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case categoryConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case categoryConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.categories.results,
        count: action.categories.count,
        next: action.categories.next,
        previous: action.categories.previous,
        success: true,
      };
    case categoryConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    //Non-pagination
    // Get Reducers
    case categoryConstants.GETALL_NONPAGINATION_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case categoryConstants.GETALL_NONPAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.categories,
        count: action.categories.count,
        next: action.categories.next,
        previous: action.categories.previous,
        success: true,
      };
    case categoryConstants.GETALL_NONPAGINATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case categoryConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case categoryConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.categories,
        success: true,
      };
    case categoryConstants.GETBYID_ERROR:
      return { ...state, error: action.error, loading: false };

    //Add reducers
    case categoryConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case categoryConstants.ADD_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.category],
        item: [],
        loading: false,
        success: true,
      };
    case categoryConstants.ADD_FAILURE:
      return { ...state, error: action.error, loading: false };

    //Update reducers
    case categoryConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case categoryConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
        loading: false,
        success: true,
      };
    case categoryConstants.UPDATE_FAILURE:
      return { ...state, error: action.error, loading: false };

    //Delete reducers
    case categoryConstants.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        items: state.items.map((category) =>
          category.id === action.id ? { ...category, deleting: true } : category
        ),
      };
    case categoryConstants.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: state.items.filter((category) => category.id !== action.id),
      };
    case categoryConstants.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: state.items.map((category) => {
          if (category.id === action.id) {
            const { deleting, ...categoryCopy } = category;
            return { ...categoryCopy, deleteError: action.error };
          }

          return category;
        }),
      };

    default:
      return state;
  }
}
