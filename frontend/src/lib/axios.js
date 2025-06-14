import axios from "axios";

export const axiosInstance = axios.create(
    {
        baseURL: "http://localhost:5001/api", // this is the backend api,,
        withCredentials: true
    }
)