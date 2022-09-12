import React from "react";
import Portal from "./Portal";
import styled from "styled-components";
import * as S from "./style";
import { ReactComponent as Close } from "../../svg/close2.svg";

export default function MUReport({ setModal, selectItem }) {
  const closeModal = () => {
    setModal(false);
  };
  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <p>신고내역</p>
          <Close onClick={closeModal} />
        </S.ModalHeader>
        <S.ModalContent>
          <Line>
            <span>회원 번호</span>
            <p>{String(selectItem.reportId).padStart(6, "0")}</p>
          </Line>
          <Line>
            <span>등록일</span>
            <p>{String(selectItem.regDateTime).replace("T", " ")}</p>
          </Line>
          <Line>
            <span>신고 사유</span>
            <p>{selectItem.categoryName}</p>
          </Line>
        </S.ModalContent>
      </S.ModalBox>
    </Portal>
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
