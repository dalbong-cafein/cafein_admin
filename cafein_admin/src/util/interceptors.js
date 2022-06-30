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
      console.log(err);
      if (response.data.error === "Unauthorized") {
        return axios
          .get(process.env.REACT_APP_API_URL + "/auth/refreshToken")
          .then(() => {
            return axios(originalRequest);
          })
          .catch((err) => {
            localStorage.clear();
          });
      }
      return Promise.reject(err);
    }
  );
  return instance;
}
