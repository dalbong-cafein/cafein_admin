import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Check } from "../svg/ArrowDown.svg";

import { reportDListApi } from "../util/desh";

export default function ReportTable() {
  const navigate = useNavigate();

  const [reportArr, setReportArr] = useState([]);
  const statusObj = {
    APPROVAL: "승인",
    REJECT: "반려",
    WAIT: "대기",
    대기: "WAIT",
    반려: "REJECT",
    승인: "APPROVAL",
  };
  useEffect(() => {
    reportDListApi()
      .then((res) => {
        setReportArr(res.data.data.reportResDtoList);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box isNull={reportArr.length === 0}>
      <p>신고</p>
      <Table>
        {reportArr?.length !== 0 && (
          <ColumnBox onClick={() => navigate("/report")}>
            {reportArr &&
              reportArr.map((item, i) => (
                <Item key={i}>
                  <div>
                    <div>{item.categoryName}</div>
                    <div>{String(item.regDateTime).split("T")[0] || "-"}</div>
                  </div>

                  <Btn content={item.reportStatus}>
                    <div />
                    {statusObj[item.reportStatus]}
                    {item.reportStatus === "WAIT" && (
                      <Check style={{ paddingBottom: "2px", paddingLeft: "3px" }} />
                    )}
                  </Btn>
                </Item>
              ))}
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

const ColumnBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #515151;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

const Btn = styled.div`
  position: relative;
  width: 86px;
  height: 26px;
  text-align: center;
  border-radius: 6px;
  color: ${(props) =>
    props.content === "APPROVAL" ? "#26BA6A" : props.content === "REJECT" ? "#f44336" : "#ff9800"};
  line-height: 26px;
  & > div:first-child {
    position: absolute;
    width: 86px;
    height: 26px;
    background-color: ${(props) =>
      props.content === "APPROVAL"
        ? "#26BA6A"
        : props.content === "REJECT"
        ? "#f44336"
        : "#ff9800"};
    opacity: 0.3;
    border-radius: 4px;
  }
`;
