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
      };
    case categoryConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.categories.results,
        count: action.categories.count,
        next: action.categories.next,
        previous: action.categories.previous,
      };
    case categoryConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case categoryConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.categories,
      };
    case categoryConstants.GETBYID_ERROR:
      return { ...state, error: action.error };

    //Add reducers
    case categoryConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.ADD_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.category],
        item: [],
      };
    case categoryConstants.ADD_FAILURE:
      return { ...state, error: action.error };

    //Update reducers
    case categoryConstants.UPDATE_REQUEST:
      return {
        ...state,
      };
    case categoryConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
      };
    case categoryConstants.UPDATE_FAILURE:
      return { ...state, error: action.error };

    //Delete reducers
    case categoryConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map((category) =>
          category.id === action.id ? { ...category, deleting: true } : category
        ),
      };
    case categoryConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter((category) => category.id !== action.id),
      };
    case categoryConstants.DELETE_FAILURE:
      return {
        ...state,
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
