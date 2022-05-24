import React from "react";
import axios from "axios";
import queryString from "query-string";
import authApi from "./util/auth";

const Auth = () => {
  const kauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=http://localhost:3000/auth&response_type=code`;
  const query = queryString.parse(window.location.search);

  React.useEffect(() => {
    if (query.code) {
      getKakaoTokenHandler(query.code.toString());
    }
  }, []);

  const getKakaoTokenHandler = async (code) => {
    const data = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_REST_API_KEY,
      redirect_uri: "http://localhost:3000/oauth/kakao/callback",
      code: code,
    };
    const queryString = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");

    //토큰 발급 REST API
    axios
      .post("https://kauth.kakao.com/oauth/token", queryString, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        console.log(res);
        authApi(res.data.access_token);
      })
      .then((res) => {
        console.log(res);
      })

      .catch((err) => console.log(err));
  };
  return <div style={{ color: "#fff" }}>ㅎㅎㄱㄷ</div>;
};

export default Auth;
