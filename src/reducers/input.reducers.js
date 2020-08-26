import { inputConstants } from "../constants";

const initialState = {
  loading: false,
  items: [],
  item: [],
  count: null,
  next: null,
  previous: null,
};

export function inputs(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case inputConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case inputConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.inputs.results,
        count: action.inputs.count,
        next: action.inputs.next,
        previous: action.inputs.previous,
      };
    case inputConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    //Non pagination
    // Get Reducers
    case inputConstants.GETALL_NONPAGINATION_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case inputConstants.GETALL_NONPAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.inputs,
        count: action.inputs.count,
        next: action.inputs.next,
        previous: action.inputs.previous,
      };
    case inputConstants.GETALL_NONPAGINATION_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case inputConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case inputConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: action.inputs,
      };
    case inputConstants.GETBYID_ERROR:
      return { ...state, loading: false, error: action.error };

    //Add reducers
    case inputConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case inputConstants.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: [],
      };
    case inputConstants.ADD_FAILURE:
      return { ...state, error: action.error, loading: false };

    //Update reducers
    case inputConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case inputConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
        loading: false,
        success: true,
      };
    case inputConstants.UPDATE_FAILURE:
      return { ...state, loading: false, error: action.error };

    //Delete reducers
    case inputConstants.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        items: state.items.map((input) =>
          input.id === action.id ? { ...input, deleting: true } : input
        ),
      };
    case inputConstants.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: state.items.filter((input) => input.id !== action.id),
      };
    case inputConstants.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: state.items.map((input) => {
          if (input.id === action.id) {
            const { deleting, ...inputCopy } = input;
            return { ...inputCopy, deleteError: action.error };
          }

          return input;
        }),
      };

    default:
      return state;
  }
}
