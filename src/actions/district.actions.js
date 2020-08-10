import { districtConstants } from "../constants";
import { districtService } from "../services";
import { history } from "../store";

export const districtActions = {
  getAll,
  getAllNonPagination,
  getById,
  add,
  update,
  delete: _delete,
};

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());
    await districtService.getAll(url).then(
      (districts) => {
        dispatch(success(districts));
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
    return { type: districtConstants.GETALL_REQUEST };
  }
  function success(districts) {
    return { type: districtConstants.GETALL_SUCCESS, districts };
  }
  function failure(error) {
    return { type: districtConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination() {
  return async (dispatch) => {
    dispatch(request());
    await districtService.getAllNonPagination().then(
      (districts) => dispatch(success(districts)),
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
    return { type: districtConstants.GETALL_REQUEST };
  }
  function success(districts) {
    return { type: districtConstants.GETALL_SUCCESS, districts };
  }
  function failure(error) {
    return { type: districtConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await districtService.getById(id).then(
      (districts) => {
        dispatch(success(districts));
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

  function request(id) {
    return { type: districtConstants.GETBYID_REQUEST, id };
  }
  function success(districts) {
    return { type: districtConstants.GETBYID_SUCCESS, districts };
  }
  function failure(error) {
    return { type: districtConstants.GETBYID_FAILURE, error };
  }
}

function add(district) {
  return async (dispatch) => {
    dispatch(request(district));
    await districtService.add(district).then(
      (district) => {
        dispatch(success(district));
        history.replace({ pathname: "/districts", state: 201 });
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

  function request(district) {
    return { type: districtConstants.ADD_REQUEST, district };
  }
  function success(district) {
    return { type: districtConstants.ADD_SUCCESS, district };
  }
  function failure(error) {
    return { type: districtConstants.ADD_FAILURE, error };
  }
}

function update(id, district) {
  return async (dispatch) => {
    dispatch(request(id));
    await districtService.update(id, district).then(
      (district) => {
        dispatch(success(id));
        dispatch(getAll());
        history.replace({ pathname: "/districts", state: 202 });
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

  function request(id) {
    return { type: districtConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: districtConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: districtConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await districtService.delete(id).then(
      () => {
        dispatch(success(id[0]));
        history.replace({ pathname: "/districts", state: 203 });
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

  function request(id) {
    return { type: districtConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: districtConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: districtConstants.DELETE_FAILURE, id, error };
  }
}
