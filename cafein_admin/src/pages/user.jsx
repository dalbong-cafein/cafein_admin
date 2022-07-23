import { useEffect, useState } from "react";

import * as S from "./style copy";
import styled from "styled-components";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as Check } from "../svg/check.svg";
import { ReactComponent as ArrowDown } from "../svg/ArrowDown.svg";

import { userDetailApi, userListApi, userSearchApi } from "../util/user";
import None from "../components/None";
import UserTemp from "../components/userTemp";
import DropBox from "../components/common/dropbox";
import MemoModal from "../components/common/modal/memo";
import MUser from "../components/common/modal/MUser";
import Row from "../components/atoms/row";
import Header from "../components/common/header";

const User = () => {
  const [temp, setTemp] = useState([]);

  const [search, setSearch] = useState("");
  const [isDrop, setIsDrop] = useState(false);
  const [selected, setSelected] = useState("전체");
  const [arr, setArr] = useState(["분류", "회원명", "핸드폰"]);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(9);
  const [modal, setModal] = useState(false);
  const [selectItem, setSelectItem] = useState([]);
  const [sort, setSort] = useState("DESC");

  const [memoId, setMemoId] = useState(null);
  const [memoModal, setMemoModal] = useState(false);

  const searchData = () => {
    if (selected === "분류") {
      userSearchApi("m", search, sort, page)
        .then((res) => {
          setTemp(res.data.data.memberResDtoList.dtoList);
          setCount(res.data.data.memberCnt);
        })
        .catch((err) => console.log(err));
    }
    if (selected === "회원명") {
      userSearchApi("mn", search, sort, page)
        .then((res) => {
          setTemp(res.data.data.memberResDtoList.dtoList);
          setCount(res.data.data.memberCnt);
        })
        .catch((err) => console.log(err));
    }
    if (selected === "핸드폰") {
      userSearchApi("p", search, sort, page)
        .then((res) => {
          setTemp(res.data.data.memberResDtoList.dtoList);
          setCount(res.data.data.memberCnt);
        })
        .catch((err) => console.log(err));
    }
  };

  const changeData = () => {
    if (selected === "전체") {
      userListApi(sort, page)
        .then((res) => {
          setTemp(res.data.data.memberResDtoList.dtoList);
          setCount(res.data.data.memberCnt);
        })
        .catch((err) => console.log(err));
    } else {
      searchData();
    }
  };

  const onModal = (item) => {
    userDetailApi(item.memberId)
      .then((res) => setSelectItem(res.data.data))
      .catch((err) => alert("존재하지 않는 회원입니다."));
    setModal(!modal);
  };

  const onclick = () => {
    setSort("DESC");
    setPage(1);
    searchData();
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const sortData = async (id) => {
    setSort(id);
  };

  useEffect(() => {
    changeData();
  }, [page, sort]);

  console.log(temp);
  return (
    <>
      <Header
        mcolor={"#fff"}
        text={"회원 정보"}
        subText={`등록된 회원 ${count}건`}
      />
      <Row
        justify={"space-between"}
        align={"baseline"}
        style={{ marginBottom: "20px" }}
      >
        <Row gap={15}>
          <S.Sbtn id="DESC" onClick={(e) => sortData(e.target.id)}>
            최신순
            {sort === "DESC" && <Check />}
          </S.Sbtn>
          <S.Sbtn id="ASC" onClick={(e) => sortData(e.target.id)}>
            오래된 순{sort === "ASC" && <Check />}
          </S.Sbtn>
        </Row>
        <Row gap={15} align={"baseline"}>
          <Paging
            count={count}
            handlePageChange={handlePageChange}
            setPage={setPage}
            page={page}
          />
          <S.Sbtn onClick={() => setIsDrop(!isDrop)}>
            {selected} <ArrowDown />
          </S.Sbtn>
          {isDrop && (
            <DropBox
              arr={arr}
              left={"85%"}
              setIsDrop={setIsDrop}
              setArr={setArr}
              selected={selected}
              setSelected={setSelected}
            />
          )}
          <Row style={{ borderBottom: "1px solid #fff" }}>
            <S.Input
              placeholder="검색"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search onClick={onclick} />
          </Row>
        </Row>
      </Row>
      <S.Wrapper isNull={temp.length === 0}>
        <TableHeader>
          <div>분류</div>
          <div>소셜</div>
          <div>회원명</div>
          <div>핸드폰</div>
          <div>이메일</div>
          <div>APP</div>
          <div>DIVICE/IP</div>
          <div>가입일</div>
          <div>상태</div>
          <div>메모</div>
        </TableHeader>

        <UserTemp
          temp={temp}
          setMemoModal={setMemoModal}
          onModal={onModal}
          page={page}
          items={items}
          setMemoId={setMemoId}
          setSelectItem={setSelectItem}
        />
      </S.Wrapper>
      {temp.length === 0 && <None text={"유저"} />}
      {memoModal && (
        <MemoModal
          memoId={memoId}
          setModal={setMemoModal}
          selectItem={selectItem}
        />
      )}
      {modal && <MUser setModal={setModal} selectItem={selectItem} />}
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
  & > div:nth-child(9) {
    flex: 1.2;
  }
  & > div:nth-child(4),
  div:nth-child(7),
  div:nth-child(8) {
    flex: 0.9;
  }

  & > div:last-child {
    border-right: none;
  }
`;

export default User;
