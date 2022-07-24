import React, { useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import styled from "styled-components";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import { useEffect } from "react";
import { reviewDelApi, reviewUserDataApi } from "../../../util/review";

export default function ReviewView({ setModal, id, loadD }) {
  const [temp, setTemp] = useState([]);
  const closeModal = () => {
    setModal(false);
    loadD(id);
  };

  const loadData = () => {
    reviewUserDataApi(id)
      .then((res) => {
        setTemp(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const reviewDel = (id) => {
    reviewDelApi(id)
      .then((res) => {
        alert("삭제 완료!");
        loadData();
      })
      .catch((err) => alert("잠시후에 다시 시도해주세요"));
  };
  const onCopyId = (item) => {
    //     navigator.clipboard.writeText(item.reviewId);
    //     window.alert(
    //       `리뷰 아이디가 복사 되었습니다.
    // 리뷰 상세는 리뷰 페이지에서 아이디로 검색해주세요`
    //     );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <p>리뷰 내역</p>
          <Close onClick={closeModal} />
        </S.ModalHeader>
        <S.ModalContent>
          <HLine>
            <span>회원번호</span>
            <p>{String(id).padStart(6, "0")}</p>
          </HLine>
          {temp &&
            temp.map((item, i) => (
              <IRow key={i}>
                <p>{i + 1}</p>
                <p onClick={() => onCopyId(item)}>{item.storeName}</p>
                <p onClick={() => onCopyId(item)}>
                  {String(item.reviewId).padStart(6, "0")}
                </p>
                <p onClick={() => onCopyId(item)}>
                  {String(item.regDateTime).split("T")[0]}
                </p>
                <p onClick={() => reviewDel(item.reviewId)}>삭제</p>
              </IRow>
            ))}
        </S.ModalContent>
      </S.ModalBox>
    </Portal>
  );
}

const HLine = styled.div`
  display: flex;

  width: 100%;
  padding: 5px 0 13px;
  border-bottom: 1px solid #333333;
  & > span {
    padding-right: 32px;
    width: 69px;
    text-align: right;
    font-size: 16px;
    font-weight: 700;
    color: #8b8b8b;
  }
  & > p:nth-child(2) {
    color: #e3e3e3;
    padding-right: 10px;
  }
`;

const IRow = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
  font-size: 14px;
  & > p:first-child {
    width: 50px;
    text-align: center;
    color: #8b8b8b;

    font-weight: 500;
  }
  & > p:nth-child(2) {
    width: 220px;
    cursor: pointer;
  }
  & > p:nth-child(3) {
    color: #e3e3e3;
    width: 100px;
    cursor: pointer;
  }
  & > p:last-child {
    color: #ff5c50;
    cursor: pointer;
  }
`;
