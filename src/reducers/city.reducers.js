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
      };
    case cityConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.cities.results,
        count: action.cities.count,
        next: action.cities.next,
        previous: action.cities.previous,
      };
    case cityConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case cityConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case cityConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.cities,
      };
    case cityConstants.GETBYID_ERROR:
      return { ...state, error: action.error };

    //Add reducers
    case cityConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case cityConstants.ADD_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.city],
        item: [],
      };
    case cityConstants.ADD_FAILURE:
      return { ...state, error: action.error };

    //Update reducers
    case cityConstants.UPDATE_REQUEST:
      return {
        ...state,
      };
    case cityConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
      };
    case cityConstants.UPDATE_FAILURE:
      return { ...state, error: action.error };

    //Delete reducers
    case cityConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map((city) =>
          city.id === action.id ? { ...city, deleting: true } : city
        ),
      };
    case cityConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter((city) => city.id !== action.id),
      };
    case cityConstants.DELETE_FAILURE:
      return {
        ...state,
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
