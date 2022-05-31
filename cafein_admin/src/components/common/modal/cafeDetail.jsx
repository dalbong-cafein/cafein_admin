import React from "react";
import Portal from "./Portal";
import * as S from "./style";
import styled from "styled-components";

import { ReactComponent as Close } from "../../../svg/close2.svg";
import Row from "../../atoms/row";
import Stars from "../../atoms/stars";

export default function CafeDetailModal({ setDModal, setDSelected }) {
  const closeModal = () => {
    setDModal(false);
  };

  console.log(setDSelected);

  return (
    <Portal>
      <ModalBox>
        <ModalBoxs
          style={{ borderRadius: "16px 0 0 16px" }}
          color={"#131313"}
          width={516}
        >
          <Title size={20}>카페 상세</Title>
          <Columnbox gap={14}>
            <Line>
              <span>분류</span>
              <p>000001</p>
              {/* <p>{selectItem.code}</p> */}
            </Line>
            <Line>
              <span>회원명</span>
              <p>00001</p>
            </Line>
            <Line>
              <span>카페명</span>
              <p>개비스 커피</p>
            </Line>
            <Line>
              <span>등록일</span>
              <p>03.29.2022</p>
            </Line>
            <Line>
              <span>최종수정일</span>
              <p>03.29.2022</p>
            </Line>

            <Title style={{ padding: "40px 0" }} size={16}>
              기본 정보
            </Title>
            <Columnbox style={{ paddingBottom: "70px" }}>
              <StateRow>
                <div>
                  <span>사진</span>
                  {/* <Btn content={selectItem.state}>{selectItem.state}</Btn> */}
                </div>
              </StateRow>
              <Line color={"#515151"}>
                <span>위치</span>
                <p>서울시 어쩌구</p>
              </Line>
              <StateRow>
                <div>
                  <span>운영시간</span>
                  {/* <Btn content={selectItem.state}>{selectItem.state}</Btn> */}
                </div>
              </StateRow>
              <Line color={"#515151"}>
                <span>기타 시간</span>
                <p>서울시 어쩌구</p>
              </Line>
              <Line color={"#515151"}>
                <span>와이파이</span>
                <p>서울시 어쩌구</p>
              </Line>
              <Line color={"#515151"}>
                <span>전화번호</span>
                <p>서울시 어쩌구</p>
              </Line>
              <Line color={"#515151"}>
                <span>웹사이트</span>
                <p>서울시 어쩌구</p>
              </Line>
            </Columnbox>
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
              <span>조회</span>
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
          </Columnbox>
          <Title style={{ padding: "40px 0" }} size={16}>
            카공 정보
          </Title>
          <Columnbox style={{ paddingBottom: "70px" }}>
            <Line color={"#515151"}>
              <span>전체</span>
              <p>86% 추천</p>
            </Line>
            <Line color={"#515151"}>
              <span>콘센트</span>
              <Stars width={18.4} gap={7} num={23} />
            </Line>
            <Line color={"#515151"}>
              <span>화장실</span>
              <Stars width={18.4} gap={7} num={7} />
            </Line>
            <Line color={"#515151"}>
              <span>테이블</span>
              <Stars width={18.4} gap={7} num={1} />
            </Line>
            <Line color={"#515151"}>
              <span>와이파이</span>
              <Stars width={18.4} gap={7} num={8} />
            </Line>
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
  height: 930px;
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
  height: 930px;
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
    width: 80px;
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
      width: 80px;
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
