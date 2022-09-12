import { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import useSearch from "../hooks/useSearch";

import * as S from "./style copy";
import styled from "styled-components";

import None from "../components/common/None";

import {
  changeStateApi,
  marketingListApi,
  marketingSearchApi,
} from "../util/events";
import RedAlert from "../components/modal/RedAlert";
import MarketingsItem from "../components/MarketingsItem";
import MemoModal from "../components/modal/Memo";
import FilterRow from "../components/common/FilterRow";

import SelectHeader from "../components/common/SelectHeader";

const Marketing = () => {
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);
  const [reportId, setReportId] = useState(null);
  const [alert, setAlert] = useState(false);

  const [memoItem, setMemoItem] = useState(null);
  const [modalMemo, setModalMemo] = useState(false);

  //drop
  const [searchType, setSearchType, searchArr, setSearchArr] = useSearch([
    "분류",
    "회원 번호",
    "핸드폰",
  ]);

  // pagination
  const [page, sort, item, count, setCount, setPage, onDesc, onAsc] =
    usePagination();

  const searchData = () => {
    marketingSearchApi(searchType, search, page, sort)
      .then((res) => {
        setData(res.data.data.couponResDtoList.dtoList);
        setCount(res.data.data.couponCnt);
      })
      .catch((err) => console.log(err));
  };

  const changeData = () => {
    if (searchType === "전체") {
      marketingListApi(page, sort)
        .then((res) => {
          setCount(res.data.data.couponCnt);
          setData(res.data.data.couponResDtoList.dtoList);
        })
        .catch((err) => console.log(err));
    } else {
      searchData();
    }
  };

  const changeState = (id) => {
    changeStateApi(id)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    changeData();
  }, [page, sort]);
  return (
    <>
      <SelectHeader
        menu={"marketing"}
        menu1={"marketing"}
        menu2={"event"}
        Tmenu1={"마케팅 서비스"}
        Tmenu2={"이벤트"}
      />
      <FilterRow
        searchType={searchType}
        setSearchType={setSearchType}
        searchArr={searchArr}
        setSearchArr={setSearchArr}
        sort={sort}
        count={count}
        page={page}
        item={item}
        onAsc={onAsc}
        onDesc={onDesc}
        setPage={setPage}
        searchData={searchData}
        search={search}
        setSearch={setSearch}
      />
      <S.Wrapper isNull={data.length === 0}>
        <TableHeader>
          <div>분류</div>
          <div>브랜드</div>
          <div>상품명</div>
          <div>회원번호</div>
          <div>핸드폰</div>
          <div>신청일</div>
          <div>처리일</div>
          <div>상태</div>
          <div>메모</div>
        </TableHeader>
        <MarketingsItem
          data={data}
          setModalMemo={setModalMemo}
          setMemoItem={setMemoItem}
          setAlert={setAlert}
          alert={alert}
          setReportId={setReportId}
          page={page}
        />
      </S.Wrapper>
      {alert && (
        <RedAlert
          text={"마케팅 서비스 상태 변경"}
          text2={"'완료'"}
          text3={"로 상태를 변경하시겠습니까?"}
          setAlert={setAlert}
          func={changeState}
          forFunc={reportId}
        />
      )}

      {modalMemo && <MemoModal item={memoItem} setModal={setModalMemo} />}
      {data.length === 0 && <None text={"마케팅 서비스"} />}
    </>
  );
};

const TableHeader = styled.div`
  font-size: 14px;
  display: flex;
  width: 100%;
  color: #8b8b8b;
  text-align: center;
  line-height: 42px;
  border-bottom: 1px solid #515151;
  & > div {
    flex: 1;
    border-right: 1px solid #515151;
  }
  & > div:nth-child(3) {
    flex: 2;
  }

  & > div:last-child {
    border-right: none;
  }
`;

export default Marketing;
