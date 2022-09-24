import React, { useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import styled from "styled-components";
import { ReactComponent as Close } from "../../svg/close2.svg";
import { useEffect } from "react";
import { userHeartListApi } from "../../util/user";

export default function HeartView({ setModal, id }) {
  const [temp, setTemp] = useState([]);
  const closeModal = () => {
    setModal(false);
  };

  const loadData = () => {
    userHeartListApi(id)
      .then((res) => {
        setTemp(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Portal setModal={setModal}>
      <S.ModalBox>
        <S.ViewHeader>
          <div>
            <p>저장 내역</p>
            <p>회원번호</p>
            <p>{String(id).padStart(6, "0")}</p>
          </div>

          <Close onClick={closeModal} />
        </S.ViewHeader>
        <S.ModalContent>
          {temp &&
            temp.map((item, i) => (
              <IRow key={i}>
                <p>{i + 1}</p>
                <p>{item.storeName}</p>
                <p>{String(item.storeId).padStart(6, "0")}</p>
                <p>{String(item.regDateTime).split("T")[0]}</p>
              </IRow>
            ))}
        </S.ModalContent>
      </S.ModalBox>
    </Portal>
  );
}

const IRow = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
  font-size: 14px;

  & > p:first-child {
    width: 30px;
    text-align: left;
    color: #8b8b8b;
    font-weight: 500;
  }
  & > p:nth-child(2) {
    width: 380px;
  }
  & > p:nth-child(3) {
    color: #e3e3e3;
    width: 100px;
  }
`;
