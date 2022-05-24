import axios from "axios";

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      //요청 성공전 호출
      //axios설정값
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    function (res) {
      //200인경우 응답 성공직전 호출 .then으로 이어짐
      return res;
    },
    function (err) {
      //200이 아닐때 에러 직전 호출 .catch로 이어짐
      return Promise.reject(err);
    }
  );
  return instance;
}
