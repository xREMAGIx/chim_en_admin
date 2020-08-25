//import { authHeader } from "../store";
import axios from "axios";
import setAuthToken from "../store/setAuthToken";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getAllNonPagination,
  getById,
  update,
  delete: _delete,
  getMe,
  add,
};

async function login(user) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(user);

  return await axios
    .post(`/api/auth/login`, body, requestConfig)
    .then(handleResponse);
}

async function getMe() {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  };
  return await axios
    .get(`/api/auth/user`, requestConfig)
    .then(handleResponse)
    .catch(handleError);
}

async function logout() {
  // remove user from local storage to log user out
  //await axios.post("/api/auth/logout/");
  localStorage.removeItem("token");
  setAuthToken(localStorage.getItem("token"));
}

async function getAll(url = null) {
  const requestConfig = {
    //headers: authHeader()
  };
  const params = url === null ? `/api/users` : `/api/users` + url;

  return await axios.get(params, requestConfig).then(handleResponse);
}

async function getAllNonPagination() {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios.get(`/api/users/`, requestConfig).then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`/api/users/${id}`, requestConfig)
    .then(handleResponse);
}

async function register(user) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);
  await axios.post("/api/auth/register", body, config).then(handleResponse);
}

async function add(user) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  user.is_staff === false
    ? (user.is_staff = "False")
    : (user.is_staff = "True");

  const body = JSON.stringify(user);
  await axios.post("/api/users/", body, config).then(handleResponse);
}

async function update(id, user, user_permissions) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const permissions = JSON.stringify({ user_permissions: user_permissions });
  await axios
    .post(`/api/users/${id}/set_permissions/`, permissions, requestConfig)
    .then(handleResponse);

  const body = JSON.stringify(user);

  await axios
    .put(`/api/users/${id}/`, body, requestConfig)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };
  const promises = await ids.map((id) => {
    return axios.delete(`/api/users/${id}`, requestConfig);
  });
  return Promise.all(promises).then(handleResponse);
}

function handleResponse(response) {
  let data;
  data = response.data;

  if (response.status === 404) {
    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}

function handleError(error) {
  if (error.response && error.response.data) {
    let errorkey = Object.keys(error.response.data)[0];

    let errorValue = error.response.data[errorkey];

    return Promise.reject(errorkey.toUpperCase() + ": " + errorValue);
  } else {
    return Promise.reject(error.response.data.error.message);
  }
}
