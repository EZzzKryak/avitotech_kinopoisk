import axios from "axios";
import { API_TOKEN, baseUrl } from "../utils/constants";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "X-API-KEY": API_TOKEN,
  },
});

export default axiosInstance;
