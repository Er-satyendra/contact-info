import axios from "axios";

function handleError(error) {
  let msg = { error: "Something Went Wrong" };
  return error?.response?.data ?? msg;
}

function handleSuccess(response) {
  return response.data;
}

const ax = axios.create({
  headers: {},
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 600000, // timeout api calls to 10 minutes
});

ax.interceptors.response.use(handleSuccess, handleError);

// Api should be called below

export async function requestApi(type, data, url) {
  try {
    if (type == "GET") {
        return await ax.get(url);
    } else if (type == "POST") {
        return await ax.post(url, data);
    } else if (type == "PUT") {
        return await ax.put(url, data);
    } else if (type == "Delete") {
        return await ax.delete(url, data);
    } else if (type == "Patch") {
        return await ax.patch(url, data);
    }
  } catch (e) {
    return e;
  }
}
