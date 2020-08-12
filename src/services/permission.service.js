import axios from "axios";
//import backendUrl from "../constants/index";

export const permissionService = {
  getAll,
  getAllNonPagination,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll(url = null) {
  const params = url === null ? `/api/permissions/` : `/api/permissions/` + url;

  return await axios.get(params).then(handleResponse);
}

async function getAllNonPagination() {
  return await axios.get(`/api/permissions/`).then(handleResponse);
}

async function getById(id) {
  return await axios.get(`/api/permissions/${id}`).then(handleResponse);
}

async function add(permission) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(permission);

  return await axios
    .post("/api/permissions/", body, requestConfig)
    .then(handleResponse);
  //}
}

async function update(id, permission) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(permission);

  return await axios
    .put(`/api/permissions/${id}/`, body, requestConfig)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };

  const promises = await ids.map((id) => {
    return axios.delete(`/api/permissions/${id}`, requestConfig);
  });
  return Promise.all(promises).then(handleResponse);
}

function handleResponse(response) {
  let data;
  data = response.data;

  if (response.status > 400) {
    const error = (data && data.message) || response.statusText;

    if (error.response && error.response.data) {
      let errorkey = Object.keys(error.response.data)[0];

      let errorValue = error.response.data[errorkey][0];

      return errorkey.toUpperCase() + ": " + errorValue;
    } else {
      return error.toString();
    }
  }
  return data;
}
