import { inputConstants } from "../constants";
import { inputService } from "../services";
import { history } from "../store";

export const inputActions = {
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
    await inputService.getAll(url).then(
      (inputs) => {
        dispatch(success(inputs));
        history.replace({ pathname: history.location.pathname, state: 200 });
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
    return { type: inputConstants.GETALL_REQUEST };
  }
  function success(inputs) {
    return { type: inputConstants.GETALL_SUCCESS, inputs };
  }
  function failure(error) {
    return { type: inputConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination() {
  return async (dispatch) => {
    dispatch(request());
    await inputService.getAllNonPagination().then(
      (inputs) => dispatch(success(inputs)),
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
    return { type: inputConstants.GETALL_NONPAGINATION_REQUEST };
  }
  function success(inputs) {
    return { type: inputConstants.GETALL_NONPAGINATION_SUCCESS, inputs };
  }
  function failure(error) {
    return { type: inputConstants.GETALL_NONPAGINATION_FAILURE, error };
  }
}

function getById(id) {
  return (dispatch) => {
    dispatch(request(id));
    inputService.getById(id).then(
      (inputs) => {
        dispatch(success(inputs));
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
    return { type: inputConstants.GETBYID_REQUEST, id };
  }
  function success(inputs) {
    return { type: inputConstants.GETBYID_SUCCESS, inputs };
  }
  function failure(error) {
    return { type: inputConstants.GETBYID_FAILURE, error };
  }
}

function add(input, image) {
  return async (dispatch) => {
    dispatch(request(input));
    await inputService.add(input, image).then(
      (input) => {
        dispatch(success(input));
        history.push({ pathname: "/input-output", state: 201 });
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

  function request(input) {
    return { type: inputConstants.ADD_REQUEST, input };
  }
  function success(input) {
    return { type: inputConstants.ADD_SUCCESS, input };
  }
  function failure(error) {
    return { type: inputConstants.ADD_FAILURE, error };
  }
}

function update(id, input) {
  return async (dispatch) => {
    dispatch(request(id));
    await inputService.update(id, input).then(
      (input) => {
        dispatch(success(id));
        history.push({ pathname: "/input-output", state: 202 });
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
    return { type: inputConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: inputConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: inputConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await inputService.delete(id).then(
      async (id) => {
        dispatch(success(id));
        history.replace({ pathname: "/input-output", state: 203 });
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
    return { type: inputConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: inputConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: inputConstants.DELETE_FAILURE, id, error };
  }
}
