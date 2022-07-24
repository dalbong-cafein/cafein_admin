import React, { useEffect, useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import styled from "styled-components";
import { reviewDelApi } from "../../../util/review";

import RedAlert from "./redAlert";
import ReportReason from "./ReportReason";
import Row from "../../atoms/row";
import Sliders from "../carousel/carousel";
import Stars from "../../atoms/stars";

export default function MReview({ setModal, selectItem2 }) {
  const closeModal = () => {
    setModal(false);
  };

  const [del, setDel] = useState(false);
  const [rReason, setRReason] = useState(false);
  const [slider, setSlider] = useState(false);

  const onDel = () => {
    reviewDelApi(selectItem2.reviewId)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Portal>
        <S.ModalBox height={"776px"}>
          <S.ModalHeader>
            <p>리뷰 상세</p>
            <Close onClick={closeModal} />
          </S.ModalHeader>
          <S.ModalContent height={"602px"}>
            <Columnbox>
              <Line>
                <span>분류</span>
                <p>{String(selectItem2.reviewId).padStart(6, "0")}</p>
              </Line>
              <Line>
                <span>회원 정보</span>
                <p>{String(selectItem2.writerId).padStart(6, "0")}</p>
                <p>{selectItem2.nicknameOfWriter || "-"}</p>
                <p>{`방문 ${selectItem2?.visitCnt}번째`}</p>
              </Line>
              <Line>
                <span>카페 정보</span>
                <p>{String(selectItem2.storeId).padStart(6, "0")}</p>
                <p>{selectItem2.storeName}</p>
              </Line>
              <Line>
                <span>등록일</span>
                <p>{String(selectItem2.regDateTime).replace("T", " ")}</p>
              </Line>
              <Line>
                <span>최종수정일</span>
                <p>{String(selectItem2.modDateTime).replace("T", " ")}</p>
              </Line>
            </Columnbox>
            <RecommendBox>
              <p>
                {selectItem2.recommendation === "GOOD"
                  ? "추천해요"
                  : selectItem2.recommendation === "NORMAL"
                  ? "그저그래요"
                  : "별로예요"}
              </p>
            </RecommendBox>
            <Row
              gap={16}
              align={"baseline"}
              style={{ margin: "10px 0 0", fontSize: "14px" }}
            >
              <Row gap={8} align={"baseline"} style={{ width: "120px" }}>
                와이파이
                <Stars
                  width={11}
                  gap={2}
                  num={selectItem2.detailEvaluation.wifi}
                  color={"#FD9759"}
                />
              </Row>
              <Row gap={8} align={"baseline"}>
                콘센트
                <Stars
                  color={"#FD9759"}
                  width={11}
                  gap={2}
                  num={selectItem2.detailEvaluation.socket}
                />
              </Row>
            </Row>
            <Row gap={16} align={"baseline"} style={{ fontSize: "14px" }}>
              <Row gap={8} align={"baseline"} style={{ width: "120px" }}>
                화장실
                <Stars
                  color={"#FD9759"}
                  width={11}
                  gap={2}
                  num={selectItem2.detailEvaluation.restroom}
                />
              </Row>
              <Row gap={8} align={"baseline"}>
                테이블
                <Stars
                  color={"#FD9759"}
                  width={11}
                  gap={2}
                  num={selectItem2.detailEvaluation.tableSize}
                />
              </Row>
            </Row>
            <Text>{selectItem2.content || "-"}</Text>

            {selectItem2.reviewImageDtoList && (
              <Row gap={10}>
                {selectItem2.reviewImageDtoList.map((item, i) => (
                  <Pic key={i} onClick={() => setSlider(true)}>
                    <img
                      src={process.env.PUBLIC_URL + item.imageUrl}
                      alt="img"
                    />
                  </Pic>
                ))}
              </Row>
            )}
          </S.ModalContent>
          <S.ModalFooter style={{ justifyContent: "end" }}>
            <Row gap={24}>
              <S.Btn color={"#515151"} onClick={() => setRReason(true)}>
                신고
              </S.Btn>
              <S.Btn color={"#2563eb"} onClick={() => setDel(true)}>
                삭제
              </S.Btn>
            </Row>
          </S.ModalFooter>
        </S.ModalBox>
      </Portal>

      {del && (
        <RedAlert
          text={"리뷰 삭제"}
          text1={"리뷰를"}
          text2={" 삭제"}
          text3={"하시겠습니까?"}
          setAlert={setDel}
          func={onDel}
          forFunc={selectItem2.reviewId}
        />
      )}
      {rReason && (
        <ReportReason setModal={setRReason} id={selectItem2.reviewId} />
      )}
      {slider && (
        <Sliders setModal={setSlider} imgs={selectItem2?.reviewImageDtoList} />
      )}
    </>
  );
}
const Columnbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Line = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  padding-bottom: 13px;
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
  & > p:nth-child(3) {
    color: #fc7521;
  }
  & > p:nth-child(4) {
    color: #acacac;
  }
`;

const Text = styled.div`
  padding: 24px 0;
  white-space: pre-line;
  line-height: 20px;
`;

const Pic = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 6px;
  background-color: #c4c4c4;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
`;

const RecommendBox = styled.div`
  margin-top: 32px;
  max-width: 63px;
  height: 22px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  background-color: #fff0e6;
  padding: 4px 8px;
  & > p {
    color: #fc6406;
  }
`;
