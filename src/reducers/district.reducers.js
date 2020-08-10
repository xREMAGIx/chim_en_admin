import { districtConstants } from "../constants";

const initialState = {
  loading: true,
  items: [],
  item: [],
  count: null,
  next: null,
  previous: null,
};

export function districts(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case districtConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case districtConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.districts.results,
        count: action.districts.count,
        next: action.districts.next,
        previous: action.districts.previous,
      };
    case districtConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case districtConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case districtConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.districts,
      };
    case districtConstants.GETBYID_ERROR:
      return { ...state, error: action.error };

    //Add reducers
    case districtConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case districtConstants.ADD_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.district],
        item: [],
      };
    case districtConstants.ADD_FAILURE:
      return { ...state, error: action.error };

    //Update reducers
    case districtConstants.UPDATE_REQUEST:
      return {
        ...state,
      };
    case districtConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
      };
    case districtConstants.UPDATE_FAILURE:
      return { ...state, error: action.error };

    //Delete reducers
    case districtConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map((district) =>
          district.id === action.id ? { ...district, deleting: true } : district
        ),
      };
    case districtConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter((district) => district.id !== action.id),
      };
    case districtConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map((district) => {
          if (district.id === action.id) {
            const { deleting, ...districtCopy } = district;
            return { ...districtCopy, deleteError: action.error };
          }

          return district;
        }),
      };

    default:
      return state;
  }
}
