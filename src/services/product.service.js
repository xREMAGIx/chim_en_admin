import axios from "axios";
//import backendUrl from "../constants/index";

export const productService = {
  getAll,
  getAllNonPagination,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll(url = null) {
  const params = url === null ? `/api/products/` : `/api/products/` + url;

  return await axios.get(params).then(handleResponse);
}

async function getAllNonPagination() {
  return await axios.get(`/api/allProducts/`).then(handleResponse);
}

async function getById(id) {
  return await axios.get(`/api/products/${id}`).then(handleResponse);
}

async function add(product, image) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(product);

  // if (imageData.get("image")) {
  //   let res;
  //   try {
  //     res = await axios.post(`/api/products`, body, requestConfig);
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
  //         "/api/products/" + res.data.data._id + "/image",
  //         imageData,
  //         configFormData
  //       )
  //       .then(handleResponse);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  return await axios
    .post("/api/products/", body, requestConfig)
    .then(handleResponse);
  //}
}

async function update(id, product, image, delImage) {
  const imageData = new FormData();

  for (let i = 0; i < image.length; i++)
    imageData.append("images", image[i].img);

  imageData.append("product", id);

  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(product);

  if (delImage.length > 0) {
    const imageRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ids: delImage,
      },
    };
    await axios.delete(`/api/products/images`, imageRequestConfig);
  }

  if (imageData.get("images")) {
    await axios
      .put(`/api/products/${id}/`, body, requestConfig)
      .then(handleResponse);

    const configFormData = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return await axios
      .post("/api/products/images", imageData, configFormData)
      .then(handleResponse);
  } else {
    return await axios
      .put(`/api/products/${id}/`, body, requestConfig)
      .then(handleResponse);
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };

  const promises = await ids.map((id) => {
    return axios.delete(`/api/products/${id}`, requestConfig);
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
