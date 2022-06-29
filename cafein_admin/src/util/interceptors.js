import axios from "axios";

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    (res) => res,
    (err) => Promise.reject(err)
  );
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response.data.error === "Unauthorized") {
        return axios
          .get(process.env.REACT_APP_API_URL + "/auth/refreshToken")
          .then((res) => {})
          .catch((err) => {
            window.location.replace("/");
            localStorage.clear();
          });
      }
    }
  );
  return instance;
}
