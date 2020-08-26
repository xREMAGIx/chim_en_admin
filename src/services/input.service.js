import axios from "axios";
//import backendUrl from "../constants/index";

export const inputService = {
  getAll,
  getAllNonPagination,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll(url = null) {
  const params = url === null ? `/api/warehouses/` : `/api/warehouses/` + url;

  return await axios.get(params).then(handleResponse);
}

async function getAllNonPagination() {
  return await axios.get(`/api/warehouses/`).then(handleResponse);
}

async function getById(id) {
  return await axios.get(`/api/warehouses/${id}`).then(handleResponse);
}

async function add(input, image) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(input);

  // if (imageData.get("image")) {
  //   let res;
  //   try {
  //     res = await axios.post(`/api/inputs`, body, requestConfig);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   const configFormData = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   try {
  //     return await axios
  //       .put(
  //         "/api/inputs/" + res.data.data._id + "/image",
  //         imageData,
  //         configFormData
  //       )
  //       .then(handleResponse);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  return await axios
    .post("/api/warehouses/", body, requestConfig)
    .then(handleResponse);
  //}
}

async function update(id, input) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(input);

  return await axios
    .put(`/api/warehouses/${id}/`, body, requestConfig)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };

  const promises = await ids.map((id) => {
    return axios.delete(`/api/warehouses/${id}`, requestConfig);
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
