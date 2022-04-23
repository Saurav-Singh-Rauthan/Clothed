import axios from "axios";

let axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DB_BASEPATH,
});

export default axiosInstance;
