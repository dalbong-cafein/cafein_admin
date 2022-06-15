import React, { useEffect } from "react";
import Portal from "./Portal";
import * as S from "./style";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import Row from "../../atoms/row";
import styled from "styled-components";
import { reviewDetailApi } from "../../../util/review";

export default function MReview({ setModal, selectItem2 }) {
  const closeModal = () => {
    setModal(false);
  };

  // console.log(selectItem2);

  useEffect(() => {
    if (selectItem2.reviewId) {
      reviewDetailApi(selectItem2.reviewId).then((res) => console.log(res));
    }
  }, []);

  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <p>리뷰 상세</p>
          <Close onClick={closeModal} />
        </S.ModalHeader>
        <S.ModalContent>
          <Columnbox>
            <Line>
              <span>분류</span>
              <p>{String(selectItem2.reviewId).padStart(6, "0")}</p>
            </Line>
            <Line>
              <span>회원명</span>
              <p>{selectItem2.nicknameOfWriter || "-"}</p>
            </Line>
            <Line>
              <span>카페명</span>
              <p>{selectItem2.storeName}</p>
            </Line>
            <Line>
              <span>등록일</span>
              <p>{selectItem2.regDateTime}</p>
            </Line>
            <Line>
              <span>최종수정일</span>
              <p>{selectItem2.modDateTime}</p>
            </Line>
          </Columnbox>
          <Text>{selectItem2.content || "-"}</Text>
          {/* {selectItem2?.reviewImageDto &&
          selectItem2?.reviewImageDto.length === 1 ? (
            <Row gap={10}>
              <Pic>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    selectItem2?.reviewImageDto.imageUrl
                  }
                  alt="img"
                />
              </Pic>
            </Row>
          ) : (
            selectItem2?.reviewImageDto.map((item, i) => (
              <Row gap={10} key={i}>
                <Pic>
                  <img
                    src={process.env.PUBLIC_URL + item?.imageUrl}
                    alt="img"
                  />
                </Pic>
              </Row>
            ))
          )} */}
          {selectItem2.reviewImageDto && (
            <Row gap={10}>
              <Pic>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    selectItem2?.reviewImageDto.imageUrl
                  }
                  alt="img"
                />
              </Pic>
            </Row>
          )}
        </S.ModalContent>
        <S.ModalFooter style={{ justifyContent: "end" }}>
          <Row gap={24}>
            <S.Btn color={"#515151"}>신고</S.Btn>
            <S.Btn color={"#2563eb"}>삭제</S.Btn>
          </Row>
        </S.ModalFooter>
      </S.ModalBox>
    </Portal>
  );
}
const Columnbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  // padding: 0 20px;
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
`;

const Text = styled.div`
  padding: 40px 0;
  white-space: pre-line;
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
