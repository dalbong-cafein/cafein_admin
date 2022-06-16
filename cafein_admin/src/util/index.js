import axios from "axios";
import { setInterceptors } from "./interceptors";

function withAuth() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/admin",
    withCredentials: true,
  });
  return setInterceptors(instance);
}

export const withAuthInstance = withAuth();
