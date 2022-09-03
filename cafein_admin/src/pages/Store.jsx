import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import useSearch from "../hooks/useSearch";
import styled from "styled-components";
import * as S from "./style copy";

import None from "../components/None";
import Header from "../components/common/header";
import MemoModal from "../components/common/modal/Memo";
import FilterRow from "../components/common/FilterRow";
import StoreModal from "../components/common/modal/StoreModal";
import StoreItem from "../components/StoreItem";

import { feedDataApi, feedSearchApi } from "../util/management";

const Store = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  //detail
  const [dModal, setDModal] = useState(false);
  const [detailStoreId, setDetailStoreId] = useState(null);
  //drop
  const [searchType, setSearchType, searchArr, setSearchArr] = useSearch([
    "분류",
    "카페명",
    "위치",
  ]);
  //memo
  const [memoItem, setMemoItem] = useState(null);
  const [modalMemo, setModalMemo] = useState(false);
  // pagination
  const [page, sort, item, count, setCount, setPage, onDesc, onAsc] =
    usePagination();

  const changeData = () => {
    if (searchType === "전체") {
      feedDataApi(page, sort)
        .then((res) => {
          setCount(res.data.data.storeCnt);
          setData(res.data.data.storeResDtoList.dtoList);
        })
        .catch((err) => console.log(err));
    } else {
      searchData();
    }
  };

  const searchData = () => {
    feedSearchApi(search, searchType, page, sort)
      .then((res) => {
        setData(res.data.data.storeResDtoList.dtoList);
        setCount(res.data.data.storeCnt);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    changeData();
  }, [page, sort]);
  return (
    <Container>
      <Header
        mcolor={"#fff"}
        text={"카페 관리"}
        subText={`등록된 카페 ${count}건`}
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
      >
        <S.Sbtn
          onClick={() => {
            navigate("/management/register");
          }}
          color={"#2563EB"}
        >
          새 카페 등록
        </S.Sbtn>
      </FilterRow>
      <S.Wrapper isNull={data.length === 0}>
        <TableHeader>
          <div>분류</div>
          <div>카페명</div>
          <div>위치</div>
          <div>연락처</div>
          <div>혼잡도</div>
          <div>리뷰</div>
          <div>등록일</div>
          <div>최종 수정일</div>
          <div>메모</div>
        </TableHeader>

        <StoreItem
          data={data}
          setModalMemo={setModalMemo}
          setDModal={setDModal}
          setMemoItem={setMemoItem}
          setDetailStoreId={setDetailStoreId}
        />
      </S.Wrapper>
      {data.length === 0 && (
        <None text="카페" text2="새 카페 등록" href="/management/register" />
      )}
      {modalMemo && <MemoModal item={memoItem} setModal={setModalMemo} />}
      {dModal && <StoreModal setDModal={setDModal} id={detailStoreId} />}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

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
  & > div:nth-child(3),
  div:nth-child(2) {
    flex: 2.5;
  }

  & > div:last-child {
    border-right: none;
  }
`;

export default Store;
