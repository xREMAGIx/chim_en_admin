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
        error: null,
        success: null,
      };
    case districtConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.districts,
        count: action.districts.count,
        next: action.districts.next,
        previous: action.districts.previous,
      };
    case districtConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case districtConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case districtConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: action.districts,
      };
    case districtConstants.GETBYID_ERROR:
      return { ...state, error: action.error, loading: false };

    //Add reducers
    case districtConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case districtConstants.ADD_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.district],
        item: [],
        loading: false,
        success: true,
      };
    case districtConstants.ADD_FAILURE:
      return { ...state, error: action.error, loading: false };

    //Update reducers
    case districtConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case districtConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
        loading: false,
        success: true,
      };
    case districtConstants.UPDATE_FAILURE:
      return { ...state, loading: false, error: action.error };

    //Delete reducers
    case districtConstants.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        items: state.items.map((district) =>
          district.id === action.id ? { ...district, deleting: true } : district
        ),
      };
    case districtConstants.DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter((district) => district.id !== action.id),
        loading: false,
        success: true,
      };
    case districtConstants.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
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
