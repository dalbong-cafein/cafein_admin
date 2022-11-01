import { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import useSearch from "../hooks/useSearch";

import * as S from "./style copy";
import styled from "styled-components";

import { userDetailApi, userListApi, userSearchApi } from "../util/user";
import None from "../components/common/None";
import UserItem from "../components/UserItem";
import MemoModal from "../components/modal/Memo";
import UserDetailModal from "../components/modal/UserDetailModal";
import Header from "../components/common/Header";
import FilterRow from "../components/common/FilterRow";

const User = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  //drop
  const [searchType, setSearchType, searchArr, setSearchArr] = useSearch([
    "분류",
    "회원명",
    "핸드폰",
  ]);

  // pagination
  const [page, sort, item, count, setCount, setPage, onDesc, onAsc] = usePagination();

  const [modal, setModal] = useState(false);
  const [selectItem, setSelectItem] = useState([]);

  //memo
  const [memoItem, setMemoItem] = useState(null);
  const [modalMemo, setModalMemo] = useState(false);

  const searchData = () => {
    userSearchApi(searchType, search, sort, page)
      .then((res) => {
        setData(res.data.data.memberResDtoList.dtoList);
        setCount(res.data.data.memberCnt);
      })
      .catch((err) => console.log(err));
  };

  const onResetData = () => {
    setSearchType("전체");
    setSearch("");
    setPage(1);
    onDesc();

    userListApi(sort, page)
      .then((res) => {
        setData(res.data.data.memberResDtoList.dtoList);
        setCount(res.data.data.memberCnt);
      })
      .catch((err) => console.log(err));
  };

  const loadD = (id) => {
    userDetailApi(id)
      .then((res) => setSelectItem(res.data.data))
      .catch((err) => {
        alert("존재하지 않는 회원입니다.");
        setModal(false);
      });
  };

  const onModal = (item) => {
    loadD(item.memberId);
    setModal(true);
  };

  useEffect(() => {
    searchData();
  }, [page, sort]);

  return (
    <>
      <Header
        mcolor="#fff"
        text="회원 정보"
        subText={`등록된 회원 ${count}건`}
        onAsc={onAsc}
        onDesc={onDesc}
        sort={sort}
      />
      <FilterRow
        searchType={searchType}
        setSearchType={setSearchType}
        searchArr={searchArr}
        setSearchArr={setSearchArr}
        count={count}
        page={page}
        item={item}
        onDesc={onDesc}
        onResetData={onResetData}
        setPage={setPage}
        searchData={searchData}
        search={search}
        setSearch={setSearch}
      />
      <S.Wrapper isNull={data.length === 0}>
        <TableHeader>
          <div>분류</div>
          <div>소셜</div>
          <div>닉네임</div>
          <div>핸드폰</div>
          <div>이메일</div>
          <div>APP</div>
          <div>가입일</div>
          <div>상태</div>
          <div>메모</div>
        </TableHeader>
        {data.length ? (
          <UserItem
            data={data}
            setModalMemo={setModalMemo}
            onModal={onModal}
            setMemoItem={setMemoItem}
          />
        ) : (
          <None text="회원" />
        )}
      </S.Wrapper>
      {modalMemo && <MemoModal item={memoItem} setModal={setModalMemo} />}
      {modal && <UserDetailModal setModal={setModal} selectItem={selectItem} loadD={loadD} />}
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
    flex: 0.5;
    border-right: 1px solid #515151;
  }
  & > div:nth-child(3),
  div:nth-child(5) {
    flex: 2;
  }
  & > div:nth-child(8) {
    flex: 1.2;
  }
  & > div:nth-child(4),
  div:nth-child(7) {
    flex: 0.9;
  }

  & > div:last-child {
    border-right: none;
  }
`;

export default User;
