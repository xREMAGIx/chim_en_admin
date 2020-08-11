import axios from "axios";
//import backendUrl from "../constants/index";

export const categoryService = {
  getAll,
  getAllNonPagination,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll(url = null) {
  const params = url === null ? `/api/categories/` : `/api/categories/` + url;

  return await axios.get(params).then(handleResponse);
}

async function getAllNonPagination() {
  return await axios.get(`/api/categories/`).then(handleResponse);
}

async function getById(id) {
  return await axios.get(`/api/categories/${id}`).then(handleResponse);
}

async function add(category, image) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(category);

  // if (imageData.get("image")) {
  //   let res;
  //   try {
  //     res = await axios.post(`/api/categories`, body, requestConfig);
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
  //         "/api/categories/" + res.data.data._id + "/image",
  //         imageData,
  //         configFormData
  //       )
  //       .then(handleResponse);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  console.log(body);
  return await axios
    .post("/api/categories/", body, requestConfig)
    .then(handleResponse);
  //}
}

async function update(id, category, image, delImage) {
  const imageData = new FormData();

  for (let i = 0; i < image.length; i++)
    imageData.append("images", image[i].img);

  imageData.append("category", id);

  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(category);
  console.log(body);

  if (delImage.length > 0) {
    const imageRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ids: delImage,
      },
    };
    try {
      await axios.delete(`/api/categories/images`, imageRequestConfig);
    } catch (error) {
      console.log(error);
    }
  }

  if (imageData.get("images")) {
    try {
      await axios
        .put(`/api/categories/${id}/`, body, requestConfig)
        .then(handleResponse);
    } catch (error) {
      console.log(error);
    }

    const configFormData = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      return await axios
        .post("/api/categories/images", imageData, configFormData)
        .then(handleResponse);
    } catch (error) {
      console.log(error);
    }
  } else {
    return await axios
      .put(`/api/categories/${id}/`, body, requestConfig)
      .then(handleResponse);
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };

  const promises = await ids.map((id) => {
    return axios.delete(`/api/categories/${id}`, requestConfig);
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
