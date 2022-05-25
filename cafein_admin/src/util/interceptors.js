import axios from "axios";

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    (res) => {
      res.headers.Authorization = `Bearer ${axios.defaults.headers.common["Authorization"]}`;
      return res;
    },
    (err) => Promise.reject(err)
  );
  instance.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
  );
  return instance;
}
