import { permissionConstants } from "../constants";
import { permissionService } from "../services";
import { history } from "../store";

export const permissionActions = {
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
    await permissionService.getAll(url).then(
      (permissions) => {
        dispatch(success(permissions));
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
    return { type: permissionConstants.GETALL_REQUEST };
  }
  function success(permissions) {
    return { type: permissionConstants.GETALL_SUCCESS, permissions };
  }
  function failure(error) {
    return { type: permissionConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination() {
  return async (dispatch) => {
    dispatch(request());
    await permissionService.getAllNonPagination().then(
      (permissions) => dispatch(success(permissions)),
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
    return { type: permissionConstants.GETALL_NONPAGINATION_REQUEST };
  }
  function success(permissions) {
    return {
      type: permissionConstants.GETALL_NONPAGINATION_SUCCESS,
      permissions,
    };
  }
  function failure(error) {
    return { type: permissionConstants.GETALL_NONPAGINATION_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await permissionService.getById(id).then(
      (permissions) => {
        dispatch(success(permissions));
      },
      (error) => dispatch(failure(error))
    );
  };

  function request(id) {
    return { type: permissionConstants.GETBYID_REQUEST, id };
  }
  function success(permissions) {
    return { type: permissionConstants.GETBYID_SUCCESS, permissions };
  }
  function failure(error) {
    return { type: permissionConstants.GETBYID_FAILURE, error };
  }
}

function add(permission, image) {
  return async (dispatch) => {
    dispatch(request(permission));
    await permissionService.add(permission, image).then(
      (permission) => {
        dispatch(success(permission));
        history.replace({ pathname: "/permissions", state: 201 });
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(permission) {
    return { type: permissionConstants.ADD_REQUEST, permission };
  }
  function success(permission) {
    return { type: permissionConstants.ADD_SUCCESS, permission };
  }
  function failure(error) {
    return { type: permissionConstants.ADD_FAILURE, error };
  }
}

function update(id, permission, image, delImageId) {
  return async (dispatch) => {
    dispatch(request(id));
    await permissionService.update(id, permission, image, delImageId).then(
      (permission) => {
        dispatch(success(id));
        history.push({ pathname: "/permissions", state: 202 });
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(id) {
    return { type: permissionConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: permissionConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: permissionConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await permissionService.delete(id).then(
      () => {
        dispatch(success(id[0]));
        history.replace({ pathname: "/permissions", state: 203 });
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
    return { type: permissionConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: permissionConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: permissionConstants.DELETE_FAILURE, id, error };
  }
}
