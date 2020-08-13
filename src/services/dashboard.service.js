import axios from "axios";
//import backendUrl from "../constants/index";

export const dashboardService = {
  getAll,
};

async function getAll(url = null) {
  const params = url === null ? `/api/dashboard` : `/api/dashboard/` + url;

  return await axios.get(params).then(handleResponse);
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
