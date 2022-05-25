import styled from "styled-components";
import { ReactComponent as Emoji } from "../svg/login.svg";
import { ReactComponent as Logo } from "../svg/Logo.svg";
import { ReactComponent as Kakao } from "../svg/kakao.svg";

import React from "react";
import axios from "axios";
import queryString from "query-string";
import authApi from "../util/auth";

import { useRecoilState } from "recoil";
import { adminState } from "../recoil/admin";
import { useNavigate } from "react-router-dom";

const LogIn = ({ KAKAO_AUTH_URL }) => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useRecoilState(adminState);
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
      redirect_uri: "http://localhost:3000/login", //수정
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
        axios.defaults.headers.common["Authorization"] = res.data.access_token;
        localStorage.setItem("wtw-token", res.data.access_token);
        authApi(res.data.access_token)
          .then((res) => {
            const copy = { ...admin };
            copy.image = res.data.data.imageDto.imageUrl;
            copy.email = res.data.data.email;
            setAdmin(copy);
          })
          .then(() => navigate("/"));
      })
      .catch((err) => console.log(err));
  };
  return (
    <Background>
      <Logo />
      <Emoji />
      <Box>
        <a href={KAKAO_AUTH_URL}>
          <Kakao />
          <p>카카오로 시작하기</p>
        </a>
      </Box>
    </Background>
  );
};

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > svg:first-child {
    width: 164px;
    height: 41px;
  }
  & > svg:nth-child(2) {
    margin: 76px 0 16px;
  }
`;

const Box = styled.div`
  width: 328px;
  height: 56px;
  background-color: #fee500;
  border-radius: 8px;
  cursor: pointer;
  & > a {
    width: 328px;
    height: 56px;
    text-decoration: none;
    display: flex;
    gap: 7px;
    justify-content: center;
    align-items: center;
    & > p {
      font-size: 15px;
      color: #3e2723;
    }
  }
`;

export default LogIn;
