import axios from "axios";

const authAPi = async (code) => {
  return axios.post(
    "http://api.cafeinofficial.com/auth/social-login",
    {},
    {
      headers: {
        authProvider: "KAKAO",
        oAuthAccessToken: code,
        // withCredentials: true,
        // // crossDomain: true,
        // // credentials: "include",
      },
    }
  );
};

export default authAPi;
