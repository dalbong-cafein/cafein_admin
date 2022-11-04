import React from "react";
import Portal from "./Portal";
import styled from "styled-components";
import * as S from "./style";
import { ReactComponent as Close } from "../../svg/close2.svg";
import Row from "../atoms/row";
import { ReactComponent as Check } from "../../svg/ArrowDown.svg";
import { changeReportStatusApi } from "../../util/events";
import { useState } from "react";
import RedAlert from "./RedAlert";

export default function MUReport({ setModal, selectItem }) {
  const closeModal = () => {
    setModal(false);
  };
  const [alert, setAlert] = useState(false);
  const [selectState, setSelectState] = useState(null);
  const [dropData, setDropData] = useState(false);
  const statusObj = {
    APPROVAL: "승인",
    REJECT: "반려",
    WAIT: "대기",
    대기: "WAIT",
    반려: "REJECT",
    승인: "APPROVAL",
  };
  const statusArrKr = ["승인", "반려", "대기"];
  const changeState = () => {
    const state = selectState == "반려" ? "reject" : "approve";
    changeReportStatusApi(selectItem.reportId, state)
      .then((res) => {
        setAlert(() => false);
        setDropData(false);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const onClickStatusBtn = () => {
    setDropData(() => true);
  };

  const onClickStatusItem = (status) => {
    const copy = { ...dropData };
    copy.isDrop = false;
    setDropData(copy);
    setSelectState(() => status);
    setAlert(() => true);
  };

  const itemStatus = statusObj[selectItem.reportStatus];

  return (
    <>
      <Portal setModal={setModal}>
        <S.ModalBox>
          <S.ModalHeader>
            <Row align="baseline" gap={16}>
              <p style={{ color: "#f6f6f6", fontSize: "20px", fontWeight: "bold" }}>신고내역</p>
              <p style={{ color: "#f6f6f6" }}>{`${selectItem.toMemberNickname} ${String(
                selectItem.toMemberId
              ).padStart(6, "0")}`}</p>
            </Row>
            <Close onClick={closeModal} />
          </S.ModalHeader>
          <S.ModalContent>
            <Line>
              <span>신고한 회원</span>
              <p>{`${selectItem.fromMemberNickname} ${String(selectItem.fromMemberId).padStart(
                6,
                "0"
              )}`}</p>
            </Line>
            <Line>
              <span>신고 등록일</span>
              <p>{String(selectItem.regDateTime).replace("T", " ")}</p>
            </Line>
            <Line>
              <span>신고 상태</span>
              <Row gap={16} align="baseline">
                <Btn
                  content={selectItem.reportStatus}
                  onClick={() => {
                    if (selectItem.reportStatus == "WAIT") {
                      onClickStatusBtn();
                    }
                  }}
                >
                  <div />
                  {itemStatus}
                  {selectItem.reportStatus === "WAIT" && (
                    <Check style={{ paddingBottom: "2px", paddingLeft: "3px" }} />
                  )}
                </Btn>
                {dropData && (
                  <DropBox>
                    {statusArrKr
                      .filter((item) => item != itemStatus)
                      .map((item, i) => (
                        <Item key={i} onClick={() => onClickStatusItem(item)}>
                          {item}
                        </Item>
                      ))}
                  </DropBox>
                )}
                <ModDate content={selectItem.reportStatus}>
                  {selectItem.modDateTime || selectItem.regDateTime}
                </ModDate>
              </Row>
            </Line>
            <Line>
              <span>리뷰 번호</span>
              <p>{String(selectItem.reviewId).padStart(6, "0")}</p>
            </Line>
            <Line>
              <span>신고 받은 회원</span>
              <p>{`${selectItem.toMemberNickname} ${String(selectItem.toMemberId).padStart(
                6,
                "0"
              )}`}</p>
            </Line>
            <Line>
              <span>신고 사유</span>
              <p>{selectItem.categoryName}</p>
            </Line>
          </S.ModalContent>
        </S.ModalBox>
      </Portal>
      {alert && (
        <RedAlert
          text="상태 변경"
          text1=""
          text2={`'${selectState}'`}
          text3="로 상태를 변경하시겠습니까?"
          setAlert={setAlert}
          func={changeState}
          forFunc={null}
        />
      )}
    </>
  );
}

const Line = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 10px 0 13px;
  border-bottom: 1px solid ${(props) => (props.color ? props.color : "#333333")};
  & > span {
    width: 100px;
    text-align: right;
    font-size: 16px;
    font-weight: 700;
    color: #8b8b8b;
  }
  & > p:nth-child(2) {
    color: #e3e3e3;
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

const ModDate = styled.p`
  color: ${(props) =>
    props.content === "APPROVAL" ? "#26BA6A" : props.content === "REJECT" ? "#f44336" : "#ff9800"};
`;

const DropBox = styled.div`
  max-width: 90px;
  height: 70px;
  border-radius: 8px;
  background-color: #646464;
  position: absolute;
  box-sizing: border-box;
  transform: translate(0, 30px);
  padding: 16px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const Item = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #fff;
  padding: 8px 30px;
  cursor: pointer;
`;
