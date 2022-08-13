import styled from "styled-components";
import { ReactComponent as Emoji } from "../svg/login.svg";
import { ReactComponent as Logo } from "../svg/Logo.svg";
import { ReactComponent as Kakao } from "../svg/kakao.svg";

import React, { useEffect } from "react";
import queryString from "query-string";
import { cafeinAuthApi, kakaoAuthApi } from "../util/auth";

import { useRecoilState } from "recoil";
import { adminState } from "../recoil/admin";
import { useNavigate } from "react-router-dom";

const LogIn = ({}) => {
  const redirect_uri = "https://admin.cafeinofficial.com/login"; //수정
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`;
  const [admin, setAdmin] = useRecoilState(adminState);
  const navigate = useNavigate();

  const getKakaoTokenHandler = async (code) => {
    kakaoAuthApi(code)
      .then((res) => {
        cafeinAuthApi(res.data.access_token)
          .then((res) => {
            const copy = { ...admin };
            copy.image = res.data.data?.imageDto?.imageUrl;
            copy.email = res.data.data.email;
            setAdmin(copy);
            navigate("/");
          })
          .catch((err) => console.log("cafein 토큰 발급 오류"));
      })
      .catch((err) => console.log("kakao 토큰 발급 오류", err));
  };

  const query = queryString.parse(window.location.search);
  useEffect(() => {
    if (query.code) {
      getKakaoTokenHandler(query.code.toString());
    }
  }, []);

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
    width: 147.58px;
    height: 40px;
  }
  & > svg:nth-child(2) {
    margin: 76px 0 57px;
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
