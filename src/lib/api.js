import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const get = async (endpoint, config = {}) => {
  try {
    const response = await apiClient.get(endpoint, config);
    return response.data;
  } catch (error) {
    handleError(error, "GET", endpoint);
  }
};

const post = async (endpoint, data, config = {}) => {
  try {
    const response = await apiClient.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    handleError(error, "POST", endpoint);
  }
};

const put = async (endpoint, data, config = {}) => {
  try {
    const response = await apiClient.put(endpoint, data, config);
    return response.data;
  } catch (error) {
    handleError(error, "PUT", endpoint);
  }
};

const patch = async (endpoint, data, config = {}) => {
  try {
    const response = await apiClient.patch(endpoint, data, config);
    return response.data;
  } catch (error) {
    handleError(error, "PATCH", endpoint);
  }
};

const del = async (endpoint, config = {}) => {
  try {
    const response = await apiClient.delete(endpoint, config);
    return response.data;
  } catch (error) {
    handleError(error, "DELETE", endpoint);
  }
};


const handleError = (error, method, endpoint) => {
  console.error(`${method} ${endpoint} failed:`, error);
  throw error.response?.data || error.message;
};


export const fetchGames = (search = "") => {
  console.log(search);
  return get("/games", {
    params: {
      search,
    },
  });
};


export const fetchFeaturedGames = () => get("/featured-games");
export const fetchMostRatedGames = () => get("/most-rated-games");
// export const createGame = (data) => post("/games", data);
// export const updateGame = (id, data) => put(`/games/${id}`, data);
// export const partialUpdateGame = (id, data) => patch(`/games/${id}`, data);
// export const deleteGame = (id) => del(`/games/${id}`);


