import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { userListApi } from "../util/user";
import Row from "./atoms/row";

export default function DateColumn() {
  function getTime() {
    const target = new Date("2022-11-01 00:00:00+0900"); //출시일
    const today = new Date();
    const gap = today - target;
    return Math.floor(gap / (1000 * 60 * 60 * 24));
  }

  const [count, setCount] = useState(null);
  const loadListData = () => {
    userListApi("DESC", 1)
      .then((res) => {
        setCount(res.data.data.memberCnt);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadListData();
  }, []);
  return (
    <ColumnBox>
      <Rows>
        <p>출시</p>
        <p>+{getTime()}일</p>
      </Rows>
      <Rows>
        <p>회원수</p>
        <p>{count}명</p>
      </Rows>
    </ColumnBox>
  );
}

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: end;
`;

const Rows = styled(Row)`
  align-items: baseline;
  width: 150px;
  justify-content: space-between;
  & > p:first-child {
    color: #8b8b8b;
  }
  & > p:nth-child(2) {
    font-size: 14px;
  }
`;
