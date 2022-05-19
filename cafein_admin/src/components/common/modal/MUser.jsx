import React from "react";
import Portal from "./Portal";
import * as S from "./style";
import styled from "styled-components";

import { ReactComponent as Close } from "../../../svg/close2.svg";
import Row from "../../atoms/row";

export default function MUser({ setModal, selectItem }) {
  const closeModal = () => {
    setModal(false);
  };
  console.log(selectItem);
  return (
    <Portal>
      <ModalBox>
        <ModalBoxs
          style={{ borderRadius: "16px 0 0 16px" }}
          color={"#131313"}
          width={516}
        >
          <Title size={20}>회원정보</Title>
          <Columnbox gap={14}>
            <Line>
              <span>분류</span>
              <p>{selectItem.code}</p>
            </Line>
            <Line>
              <span>소셜</span>
              <p style={{ color: "#FC7521" }}>{selectItem.social[0]}</p>
              {selectItem.social[1] && (
                <p style={{ color: "#e3e3e3" }}>{selectItem.social[1]}</p>
              )}
            </Line>
            <Line>
              <span>회원명</span>
              <Row gap={190}>
                <p>{selectItem.name}</p>
                <Pic img={process.env.PUBLIC_URL + selectItem.img}>
                  {selectItem.img ? <div></div> : <p>대표사진</p>}
                </Pic>
              </Row>
            </Line>
            <Line>
              <span>핸드폰</span>
              <p>{selectItem.phoneNum}</p>
            </Line>
            <Line>
              <span>이메일</span>
              <p>{selectItem.email}</p>
            </Line>
            <Line>
              <span>생년월일</span>
              <p>1992.00.00</p>
            </Line>
            <Line>
              <span>성별</span>
              <p>남/여</p>
            </Line>
            <Line>
              <span>APP</span>
              <p>{selectItem.app}</p>
            </Line>
            <Line>
              <span>DEVICE IP</span>
              <p>
                {selectItem.divice}
                <br />
                {selectItem.ip}
              </p>
            </Line>
          </Columnbox>
        </ModalBoxs>
        <ModalBoxs
          style={{ borderRadius: "0 16px 16px 0" }}
          color={"#333333"}
          width={476}
        >
          <Row justify={"space-between"}>
            <Title size={16}>활동정보</Title>
            <Close onClick={closeModal} />
          </Row>
          <Columnbox>
            <Line color={"#515151"}>
              <span>방문</span>
              <p>100회</p>
            </Line>
            <Line color={"#515151"}>
              <span>저장</span>
              <p>100회</p>
            </Line>
            <Line color={"#515151"}>
              <span>공유</span>
              <p>100회</p>
            </Line>
            <Line color={"#515151"}>
              <span>혼잡도</span>
              <p>100회</p>
            </Line>
            <Line color={"#515151"}>
              <span>리뷰</span>
              <p>100회</p>
            </Line>
            <Line color={"#515151"}>
              <span>스티커</span>
              <p>100회</p>
            </Line>
            <Line color={"#515151"}>
              <span>방문</span>
              <p>100회</p>
            </Line>
          </Columnbox>
          <Title style={{ padding: "40px 0" }} size={16}>
            기타
          </Title>
          <Columnbox style={{ paddingBottom: "70px" }}>
            <Line color={"#515151"}>
              <span>가입일</span>
              <p>{selectItem.join}</p>
            </Line>
            <StateRow>
              <div>
                <span>상태</span>
                <Btn content={selectItem.state}>{selectItem.state}</Btn>
                <p>탈퇴</p>
              </div>
            </StateRow>
          </Columnbox>
          <Row gap={24}>
            <S.Btn color={"#515151"}>삭제</S.Btn>
            <S.Btn color={"#2563eb"}>수정</S.Btn>
          </Row>
        </ModalBoxs>
      </ModalBox>
    </Portal>
  );
}

const ModalBox = styled.div`
  width: 992px;
  height: 780px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #131313;
  box-sizing: border-box;
  border: 1px solid #515151;
  border-radius: 16px;
  display: flex;
`;
const ModalBoxs = styled.div`
  width: ${(props) => props.width && props.width}px;
  height: 778px;
  box-sizing: border-box;
  background-color: ${(props) => props.color && props.color};
  color: #fff;
  padding: 40px;
`;

const Title = styled.p`
  font-size: ${(props) => props.size}px;
  font-weight: 700;
  color: #f6f6f6;
  padding-bottom: 60px;
`;
const Line = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  padding-bottom: 13px;
  border-bottom: 1px solid ${(props) => (props.color ? props.color : "#333333")};
  & > span {
    width: 59px;
    text-align: right;
    font-size: 16px;
    font-weight: 700;
    color: #8b8b8b;
  }
  & > p:nth-child(2) {
    color: #e3e3e3;
  }
`;

const StateRow = styled.div`
  display: flex;

  padding-bottom: 70px;
  border-bottom: 1px solid #515151;
  & > div {
    display: flex;
    gap: 32px;
    align-items: baseline;
    & > span {
      width: 59px;
      text-align: right;
      font-size: 16px;
      font-weight: 700;
      color: #8b8b8b;
    }
    & > p {
      margin-left: 80px;
      font-weight: 700;
      color: #f44336;
    }
  }
`;
const Columnbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 20px;
`;

const Pic = styled.div`
  width: 64px;
  height: 64px;
  background-color: #c4c4c4;
  & > div {
    background-img: ${(props) => props.img && props.img};
    z-index: 9;
    width: 100%;
    height: 100%;
  }
`;

const Btn = styled.div`
  background-color: ${(props) =>
    props.content === "기본"
      ? "#26BA6A"
      : props.content === "신고"
      ? "#f44336"
      : "#ff9800"};
  width: 96px;
  height: 26px;
  text-align: center;
  opacity: 0.3;
  border-radius: 6px;
  color: #fff;
  line-height: 26px;
`;
