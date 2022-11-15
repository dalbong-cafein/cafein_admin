import React, { useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import styled from "styled-components";
import { ReactComponent as Close } from "../../svg/close2.svg";
import Row from "../atoms/row";
import SubFilter from "../common/SubFilter";

import { useEffect } from "react";
import { cafeCongestionsListApi } from "../../util/management";
import usePagination from "../../hooks/usePagination";
import Paging from "../common/Pagination";

export default function CongestionModal({ setModal, storeId, storeName }) {
  const [temp, setTemp] = useState([]);
  const dayArr = ["전체", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
  const WEEKDAY = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const [page, _, item, count, setCount, setPage, __, ___] = usePagination(10);

  const [day, setDay] = useState("전체");

  const closeModal = () => {
    setModal(false);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const loadData = () => {
    let minusDay;
    const date = WEEKDAY.indexOf(WEEKDAY[new Date().getDay()]);
    const indexDay = WEEKDAY.indexOf(day);

    if (indexDay != -1) {
      minusDay = date >= indexDay ? date - indexDay : 7 - (indexDay - date);
    }
    cafeCongestionsListApi(page, storeId, minusDay)
      .then((res) => {
        setCount(res.data.data.congestionCnt);
        setTemp(res.data.data.congestionResDtoList);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, [page, day]);
  return (
    <Portal setModal={setModal}>
      <S.ModalBox>
        <S.ViewHeader>
          <div>
            <p>혼잡도 내역</p>
            <p>
              {storeName} ({String(storeId).padStart(6, "0")})
            </p>
          </div>
          <Close onClick={closeModal} />
        </S.ViewHeader>
        <ModalContent>
          <p>총 {count}개</p>
          <SubFilter small arr={dayArr} selectedItem={day} setSelectedItem={setDay} />
          <ItemHeader>
            <div>
              <div>분류</div>
              <div>회원 번호</div>
              <div>혼잡도 상태</div>
            </div>
            <div>등록일</div>
          </ItemHeader>
          {temp.length > 0 &&
            temp?.map((item, i) => (
              <ItemRow key={i}>
                <div>
                  <div>{i + 1}</div>
                  <div>{String(item.writerId).padStart(6, "0")}</div>
                  <div>
                    <CongestionBtn id={parseInt(item.congestionScore)}>
                      {parseInt(item.congestionScore) == 1
                        ? "여유"
                        : parseInt(item.congestionScore) == 2
                        ? "보통"
                        : "혼잡"}
                    </CongestionBtn>
                  </div>
                </div>
                <div>{String(item.regDateTime).split("T").join(" ")}</div>
              </ItemRow>
            ))}
          <div>
            <Paging count={count} handlePageChange={handlePageChange} page={page} item={item} />
          </div>
        </ModalContent>
      </S.ModalBox>
    </Portal>
  );
}

const ModalContent = styled.div`
  color: #fff;
  height: ${(props) => (props.height ? props.height : "520px")};
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: none;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: gray;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  & > p:first-child {
    color: #acacac;
    padding: 10px 0 20px;
    font-size: 14px;
  }
  & > div:last-child {
    display: flex;
    width: calc(100% - 64px);
    justify-content: center;
    position: absolute;
    bottom: 32px;
  }
`;

const CongestionBtn = styled.div`
  padding: 5px 3px;
  background-color: ${(props) =>
    props.id == 1 ? "#DFF5E8" : props.id == 2 ? "#FFF3E0" : "#FFEBEE"};
  color: ${(props) => (props.id == 1 ? "#26BA6A" : props.id == 2 ? "#FF9800" : "#F44336")};
  border-radius: 4px;
`;

const ItemRow = styled.div`
  display: flex;
  padding: 10px;
  color: #e3e3e3;
  justify-content: space-between;
  &>div: first-child {
    display: flex;
    width: 300px;
    & > div {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    & > div:first-child {
      flex: 0.6;
    }
    & > div:nth-child(3) {
      flex: 1;
    }
  }
  & > div:last-child {
    display: flex;
    width: 150px;
    justify-content: center;
  }
`;

const ItemHeader = styled.div`
  width: calc(100%-64px);
  border-radius: 6px;
  background-color: #333333;
  margin-bottom: 16px;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  font-weight: 600;
  color: #acacac;
  & > div:first-child {
    display: flex;
    width: 300px;
    & > div {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    & > div:first-child {
      flex: 0.6;
    }
  }
  & > div:last-child {
    display: flex;
    width: 150px;
    justify-content: center;
  }
`;
