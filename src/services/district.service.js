import axios from "axios";
//import backendUrl from "../constants/index";

export const districtService = {
  getAll,
  getAllNonPagination,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll(url = null) {
  const params = url === null ? `/api/districts/` : url;

  return await axios.get(params).then(handleResponse);
}

async function getAllNonPagination() {
  return await axios.get(`/api/allCategories/`).then(handleResponse);
}

async function getById(id) {
  return await axios.get(`/api/districts/${id}`).then(handleResponse);
}

async function add(district) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(district);

  return await axios
    .post("/api/districts/", body, requestConfig)
    .then(handleResponse);
}

async function update(id, district) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(district);

  return await axios
    .put(`/api/districts/${id}/`, body, requestConfig)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {};

  const promises = await ids.map((id) => {
    return axios.delete(`/api/districts/${id}`, requestConfig);
  });
  return Promise.all(promises).then(handleResponse);
}

function handleResponse(response) {
  let data = response.data;

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
