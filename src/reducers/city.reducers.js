import { cityConstants } from "../constants";

const initialState = {
  loading: true,
  items: [],
  item: [],
  count: null,
  next: null,
  previous: null,
};

export function cities(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case cityConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case cityConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.cities,
        count: action.cities.count,
        next: action.cities.next,
        previous: action.cities.previous,
      };
    case cityConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case cityConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case cityConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: action.cities,
      };
    case cityConstants.GETBYID_ERROR:
      return { ...state, error: action.error, loading: false };

    //Add reducers
    case cityConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case cityConstants.ADD_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.city],
        item: [],
        loading: false,
        success: true,
      };
    case cityConstants.ADD_FAILURE:
      return { ...state, error: action.error, loading: false };

    //Update reducers
    case cityConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case cityConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
        success: true,
        loading: false,
      };
    case cityConstants.UPDATE_FAILURE:
      return { ...state, error: action.error, loading: false };

    //Delete reducers
    case cityConstants.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        items: state.items.map((city) =>
          city.id === action.id ? { ...city, deleting: true } : city
        ),
      };
    case cityConstants.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: state.items.filter((city) => city.id !== action.id),
      };
    case cityConstants.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: state.items.map((city) => {
          if (city.id === action.id) {
            const { deleting, ...cityCopy } = city;
            return { ...cityCopy, deleteError: action.error };
          }

          return city;
        }),
      };

    default:
      return state;
  }
}
