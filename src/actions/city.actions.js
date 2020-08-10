import { cityConstants } from "../constants";
import { cityService } from "../services";
import { history } from "../store";

export const cityActions = {
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
    await cityService.getAll(url).then(
      (cities) => {
        dispatch(success(cities));
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
    return { type: cityConstants.GETALL_REQUEST };
  }
  function success(cities) {
    return { type: cityConstants.GETALL_SUCCESS, cities };
  }
  function failure(error) {
    return { type: cityConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination() {
  return async (dispatch) => {
    dispatch(request());
    await cityService.getAllNonPagination().then(
      (cities) => dispatch(success(cities)),
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
    return { type: cityConstants.GETALL_REQUEST };
  }
  function success(cities) {
    return { type: cityConstants.GETALL_SUCCESS, cities };
  }
  function failure(error) {
    return { type: cityConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await cityService.getById(id).then(
      (cities) => {
        dispatch(success(cities));
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
    return { type: cityConstants.GETBYID_REQUEST, id };
  }
  function success(cities) {
    return { type: cityConstants.GETBYID_SUCCESS, cities };
  }
  function failure(error) {
    return { type: cityConstants.GETBYID_FAILURE, error };
  }
}

function add(city) {
  return async (dispatch) => {
    dispatch(request(city));
    await cityService.add(city).then(
      (city) => {
        dispatch(success(city));
        history.replace({ pathname: "/cities", state: 201 });
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

  function request(city) {
    return { type: cityConstants.ADD_REQUEST, city };
  }
  function success(city) {
    return { type: cityConstants.ADD_SUCCESS, city };
  }
  function failure(error) {
    return { type: cityConstants.ADD_FAILURE, error };
  }
}

function update(id, city) {
  return async (dispatch) => {
    dispatch(request(id));
    await cityService.update(id, city).then(
      (cities) => {
        dispatch(success(id));
        dispatch(getAll());

        history.replace({ pathname: "/cities", state: 202 });
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
    return { type: cityConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: cityConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: cityConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await cityService.delete(id).then(
      () => {
        dispatch(success(id[0]));
        history.replace({ pathname: "/cities", state: 203 });
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
    return { type: cityConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: cityConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: cityConstants.DELETE_FAILURE, id, error };
  }
}
