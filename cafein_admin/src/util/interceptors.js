import axios from "axios";

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    (res) => res,
    (err) => Promise.reject(err)
  );
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      const { config, response } = err;
      let originalRequest = config;
      if (response.status == 401) {
        return axios
          .get(process.env.REACT_APP_API_URL + "/auth/refreshToken")
          .then(() => {
            return axios(originalRequest);
          })
          .catch((err) => {
            window.location.replace("/login");
            localStorage.clear();
          });
      } else {
        window.location.replace("/login");
        localStorage.clear();
      }
      return Promise.reject(err);
    }
  );
  return instance;
}
