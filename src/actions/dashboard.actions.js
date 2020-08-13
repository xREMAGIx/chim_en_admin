import { dashboardConstants } from "../constants";
import { dashboardService } from "../services";

export const dashboardActions = {
  getAll,
};

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());
    await dashboardService.getAll(url).then(
      (dashboard) => {
        dispatch(success(dashboard));
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request() {
    return { type: dashboardConstants.GETALL_REQUEST };
  }
  function success(dashboard) {
    return { type: dashboardConstants.GETALL_SUCCESS, dashboard };
  }
  function failure(error) {
    return { type: dashboardConstants.GETALL_FAILURE, error };
  }
}
