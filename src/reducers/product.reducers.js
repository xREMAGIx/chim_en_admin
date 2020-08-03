import { productConstants } from "../constants";

const initialState = {
  loading: true,
  items: [],
  item: [],
};

export function products(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case productConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.products.results,
      };
    case productConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case productConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.products,
      };
    case productConstants.GETBYID_ERROR:
      return { ...state, error: action.error };

    //Add reducers
    case productConstants.ADD_REQUEST:
      return {
        ...state,
      };
    case productConstants.ADD_SUCCESS:
      return {
        ...state,
        item: [],
      };
    case productConstants.ADD_FAILURE:
      return { ...state, error: action.error };

    //Update reducers
    case productConstants.UPDATE_REQUEST:
      return {
        ...state,
      };
    case productConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
      };
    case productConstants.UPDATE_FAILURE:
      return { ...state, error: action.error };

    //Delete reducers
    case productConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map((product) =>
          product.id === action.id ? { ...product, deleting: true } : product
        ),
      };
    case productConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter((product) => product.id !== action.id),
      };
    case productConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map((product) => {
          if (product.id === action.id) {
            const { deleting, ...productCopy } = product;
            return { ...productCopy, deleteError: action.error };
          }

          return product;
        }),
      };

    default:
      return state;
  }
}
