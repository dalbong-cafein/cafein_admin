import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TableItem from "./DeshMarketingTableItem";

import { marketingDListApi } from "../util/desh";
import NoneDiv from "./common/Nonediv";

export default function MarketingTable() {
  const navigate = useNavigate();

  const [marketingArr, setMarketingArr] = useState([]);

  useEffect(() => {
    marketingDListApi()
      .then((res) => {
        setMarketingArr(res.data.data.couponResDtoList);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box isNull={marketingArr.length === 0}>
      <p>마케팅 서비스</p>
      <Table>
        <THead isNull={marketingArr.length === 0}>
          <div>회원번호</div>
          <div>상품명</div>
          <div>신청 날짜</div>
          <div>처리 날짜</div>
          <div>상태</div>
        </THead>

        {marketingArr?.length === 0 ? (
          <NoneDiv padding={100} text={"마케팅 서비스"} loc={"marketing"} />
        ) : (
          <ColumnBox onClick={() => navigate("/marketing")}>
            {marketingArr &&
              marketingArr.map((item, i) => <TableItem key={i} item={item} />)}
          </ColumnBox>
        )}
      </Table>
    </Box>
  );
}

const Box = styled.div`
  flex: 1.5;
  background-color: #222222;
  border-radius: 16px;
  padding: 24px;
  box-sizing: border-box;

  & > p:first-child {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  & > div {
    display: flex;
    height: ${(props) => (props.isNull ? "50%" : "100%")};
    flex-direction: column;
    justify-content: center;
    align-itema: center;
  }
`;

const Table = styled.div`
  width: 100%;
  font-size: 14px;
  box-sizing: border-box;
`;

const THead = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #333333;
  border-radius: 20px;
  margin: ${(props) => (props.isNull ? "32px 0" : "10px 0")};
  box-sizing: border-box;
  font-size: 14px;

  & > div {
    flex: 1;
    text-align: center;
  }
  & > div:nth-child(2) {
    flex: 2;
  }
`;

const ColumnBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
`;
