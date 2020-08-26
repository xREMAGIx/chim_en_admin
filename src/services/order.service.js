import axios from "axios";
//import backendUrl from "../constants/index";

export const orderService = {
  getAll,
  getAllNonPagination,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll(url = null) {
  const params = url === null ? `/api/payments/` : `/api/payments/` + url;

  return await axios.get(params).then(handleResponse).catch(handleError);
}

async function getAllNonPagination() {
  return await axios
    .get(`/api/payments/`)
    .then(handleResponse)
    .catch(handleError);
}

async function getById(id) {
  return await axios
    .get(`/api/payments/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

async function add(order) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(order);

  return await axios
    .post("/api/payments/", body, requestConfig)
    .then(handleResponse, handleResponse);
  //}
}

async function update(id, order) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(order);

  return await axios
    .put(`/api/payments/${id}/`, body, requestConfig)
    .then(handleResponse)
    .catch(handleError);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };

  const promises = await ids.map((id) => {
    return axios.delete(`/api/payments/${id}`, requestConfig);
  });
  return Promise.all(promises).then(handleResponse).catch(handleError);
}

function handleResponse(response) {
  const data = response.data;
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
