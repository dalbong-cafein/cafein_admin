import React from "react";
import styled from "styled-components";
import Row from "./atoms/row";
export default function DateColumn() {
  function getTime() {
    const target = new Date("2022-06-02 00:00:00+0900"); //출시일
    const today = new Date();
    const gap = today - target;
    return Math.floor(gap / (1000 * 60 * 60 * 24));
  }

  return (
    <ColumnBox>
      <Rows>
        <p>출시</p>
        <p>+{getTime()}일</p>
      </Rows>
      <Rows>
        <p>회원수</p>
        <p>0명</p>
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
