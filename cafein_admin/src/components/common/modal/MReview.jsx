import React, { useEffect, useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import styled from "styled-components";
import { reviewDelApi } from "../../../util/review";

import RedAlert from "./redAlert";
import ReportReason from "./ReportReason";
import Row from "../../atoms/row";

export default function MReview({ setModal, selectItem2 }) {
  const closeModal = () => {
    setModal(false);
  };

  const [del, setDel] = useState(false);
  const [rReason, setRReason] = useState(false);

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
                <p>{String(selectItem2.regDateTime).replace("T", " ")}</p>
              </Line>
              <Line>
                <span>최종수정일</span>
                <p>{String(selectItem2.modDateTime).replace("T", " ")}</p>
              </Line>
            </Columnbox>
            <Text>{selectItem2.content || "-"}</Text>

            {selectItem2.reviewImageDtoList && (
              <Row gap={10}>
                {selectItem2.reviewImageDtoList.map((item, i) => (
                  <Pic key={i}>
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
              <S.Btn
                color={"#515151"}
                onClick={() =>
                  // setRReason(true)
                  window.alert("서비스 준비중입니다.")
                }
              >
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
      {rReason && <ReportReason setModal={setRReason} />}
    </>
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
