import axios from "axios";

//우리토큰발급
export const cafeinAuthApi = async (code) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/auth/social-login`,
    { authProvider: "KAKAO", authToken: code },
    {
      withCredentials: true,
    }
  );
};

export const kakaoAuthApi = async (code) => {
  const data = {
    grant_type: "authorization_code",
    client_id: process.env.REACT_APP_REST_API_KEY,
    redirect_uri: "http://localhost:3000/login", //수정
    code: code,
  };
  const queryString = Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

  return await axios.post("https://kauth.kakao.com/oauth/token", queryString, {
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    withCredentials: false,
  });
};
