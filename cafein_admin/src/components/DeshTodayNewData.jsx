import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as Cup } from "../svg/Cup.svg";
import { ReactComponent as User } from "../svg/user.svg";
import { ReactComponent as Review } from "../svg/review.svg";
import { ReactComponent as Mail } from "../svg/mail.svg";

import { deshDataApi } from "../util/desh";

export default function DeshTodayNewData({}) {
  const navigate = useNavigate();

  const [deshData, setDeshData] = useState([]);

  useEffect(() => {
    deshDataApi()
      .then((res) => setDeshData(res.data.data))
      .catch((err) => console.log(err));
  });
  return (
    <RowBox>
      <Box
        colorS={"#FC6406"}
        onClick={() => {
          navigate("/management");
        }}
      >
        <div>
          <p>오늘 등록된 카페</p>
          <Cup />
        </div>
        <p>{deshData?.storeCnt}곳</p>
      </Box>
      <Box
        colorS={"#2563eb"}
        onClick={() => {
          navigate("/user");
        }}
      >
        <div>
          <p>오늘 등록된 회원</p>
          <User />
        </div>
        <p>{deshData?.memberCnt}명</p>
      </Box>
      <Box
        colorS={"#26ba6a"}
        onClick={() => {
          navigate("/review");
        }}
      >
        <div>
          <p>오늘 등록된 리뷰</p>
          <Review />
        </div>
        <p>{deshData?.reviewCnt}개</p>
      </Box>
      <Box>
        <div>
          <p>메일함</p>
          <Mail />
        </div>
        <p>0개</p>
      </Box>
    </RowBox>
  );
}

const RowBox = styled.div`
  width: 100%;
  height: 140px;
  background-color: #222222;
  border-radius: 16px;
  display: flex;
  & > div:not(:first-child) {
    border-left: 1px solid #515151;
  }
`;

const Box = styled.div`
  flex: 1;
  margin: 32px 0;
  padding: 0 56px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  gap: 32px;
  & > div {
    display: flex;
    gap: 9.5px;
    & > p {
      color: #8b8b8b;
    }
    & > svg {
      width: 15px;
      height: 15px;
      path {
        fill: ${(props) => props.colorS && props.colorS};
      }
    }
  }
  & > p:last-child {
    color: #fff;
    font-size: 22px;
    font-weight: bold;
  }
`;
