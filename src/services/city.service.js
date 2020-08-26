import axios from "axios";
//import backendUrl from "../constants/index";

export const cityService = {
  getAll,
  getAllNonPagination,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll(url = null) {
  const params = url === null ? `/api/cities/` : `/api/cities/` + url;

  return await axios.get(params).then(handleResponse).catch(handleError);
}

async function getAllNonPagination() {
  return await axios
    .get(`/api/cities/`)
    .then(handleResponse)
    .catch(handleError);
}

async function getById(id) {
  return await axios
    .get(`/api/cities/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

async function add(city) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(city);

  return await axios
    .post("/api/cities/", body, requestConfig)
    .then(handleResponse)
    .catch(handleError);
}

async function update(id, city) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(city);

  return await axios
    .put(`/api/cities/${id}/`, body, requestConfig)
    .then(handleResponse)
    .catch(handleError);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {};

  const promises = await ids.map((id) => {
    return axios.delete(`/api/cities/${id}`, requestConfig);
  });
  return Promise.all(promises).then(handleResponse).catch(handleError);
}

function handleResponse(response) {
  let data = response.data;

  return data;
}

function handleError(response) {
  if (response.response.status === 500) {
    return Promise.reject("Server Error");
  }
  if (response.response.status > 400) {
    const error = response.data.data;

    if (error.response && error.response.data) {
      let errorkey = Object.keys(error.response.data)[0];

      let errorValue = error.response.data[errorkey][0];

      return Promise.reject(errorkey.toUpperCase() + ": " + errorValue);
    } else {
      return Promise.reject(error.toString());
    }
  }
}
