import { orderConstants } from "../constants";

const initialState = {
  loading: true,
  items: [],
  item: [],
  count: null,
  next: null,
  previous: null,
};

export function orders(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case orderConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.orders.results,
        count: action.orders.count,
        next: action.orders.next,
        previous: action.orders.previous,
      };
    case orderConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case orderConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.orders,
      };
    case orderConstants.GETBYID_ERROR:
      return { ...state, error: action.error };

    //Add reducers
    case orderConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.ADD_SUCCESS:
      return {
        ...state,
        item: [],
      };
    case orderConstants.ADD_FAILURE:
      return { ...state, error: action.error };

    //Update reducers
    case orderConstants.UPDATE_REQUEST:
      return {
        ...state,
      };
    case orderConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
      };
    case orderConstants.UPDATE_FAILURE:
      return { ...state, error: action.error };

    //Delete reducers
    case orderConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map((order) =>
          order.id === action.id ? { ...order, deleting: true } : order
        ),
      };
    case orderConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter((order) => order.id !== action.id),
      };
    case orderConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map((order) => {
          if (order.id === action.id) {
            const { deleting, ...orderCopy } = order;
            return { ...orderCopy, deleteError: action.error };
          }

          return order;
        }),
      };

    default:
      return state;
  }
}
