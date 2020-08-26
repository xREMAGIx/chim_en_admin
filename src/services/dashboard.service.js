import axios from "axios";
//import backendUrl from "../constants/index";

export const dashboardService = {
  getAll,
};

async function getAll(url = null) {
  const params = url === null ? `/api/dashboard` : `/api/dashboard/` + url;

  return await axios.get(params).then(handleResponse).catch(handleError);
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
