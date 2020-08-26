import { categoryConstants } from "../constants";
import { categoryService } from "../services";
import { history } from "../store";

export const categoryActions = {
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
    await categoryService.getAll(url).then(
      (categories) => {
        dispatch(success(categories));
        history.replace({ pathname: history.location.pathname, state: 200 });
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: categoryConstants.GETALL_REQUEST };
  }
  function success(categories) {
    return { type: categoryConstants.GETALL_SUCCESS, categories };
  }
  function failure(error) {
    return { type: categoryConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination() {
  return async (dispatch) => {
    dispatch(request());
    await categoryService.getAllNonPagination().then(
      (categories) => dispatch(success(categories)),
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: categoryConstants.GETALL_NONPAGINATION_REQUEST };
  }
  function success(categories) {
    return { type: categoryConstants.GETALL_NONPAGINATION_SUCCESS, categories };
  }
  function failure(error) {
    return { type: categoryConstants.GETALL_NONPAGINATION_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await categoryService.getById(id).then(
      (categories) => {
        dispatch(success(categories));
      },
      (error) => dispatch(failure(error))
    );
  };

  function request(id) {
    return { type: categoryConstants.GETBYID_REQUEST, id };
  }
  function success(categories) {
    return { type: categoryConstants.GETBYID_SUCCESS, categories };
  }
  function failure(error) {
    return { type: categoryConstants.GETBYID_FAILURE, error };
  }
}

function add(category, image) {
  return async (dispatch) => {
    dispatch(request(category));
    await categoryService.add(category, image).then(
      (category) => {
        dispatch(success(category));
        history.replace({ pathname: "/categories", state: 201 });
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(category) {
    return { type: categoryConstants.ADD_REQUEST, category };
  }
  function success(category) {
    return { type: categoryConstants.ADD_SUCCESS, category };
  }
  function failure(error) {
    return { type: categoryConstants.ADD_FAILURE, error };
  }
}

function update(id, category, image, delImageId) {
  return async (dispatch) => {
    dispatch(request(id));
    await categoryService.update(id, category, image, delImageId).then(
      (category) => {
        dispatch(success(id));
        history.push({ pathname: "/categories", state: 202 });
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(id) {
    return { type: categoryConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: categoryConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: categoryConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await categoryService.delete(id).then(
      () => {
        dispatch(success(id[0]));
        history.replace({ pathname: "/categories", state: 203 });
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(id) {
    return { type: categoryConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: categoryConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: categoryConstants.DELETE_FAILURE, id, error };
  }
}
