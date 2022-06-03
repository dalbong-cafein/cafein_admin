import Header from "../components/common/header";

import * as S from "./style";

import { useEffect, useState } from "react";
import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as Check } from "../svg/check.svg";
import { ReactComponent as ArrowDown } from "../svg/ArrowDown.svg";

import styled from "styled-components";
import MUser from "../components/common/modal/MUser";
import { userDetailApi, userListApi, userSearchApi } from "../util/user";
import None from "../components/None";
import UserTemp from "../components/userTemp";
import DropBox from "../components/common/dropbox";
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
  const handlePageChange = (page) => {
    setPage(page);
  };

  const onModal = (item) => {
    userDetailApi(item.memberId)
      .then((res) => setSelectItem(res.data.data))
      .catch((err) => alert("존재하지 않는 회원입니다."));
    setModal(!modal);
  };

  const onclick = () => {
    if (selected === "분류") {
      userSearchApi("m", search)
        .then((res) => setTemp(res.data.data.memberResDtoList.dtoList))
        .catch((err) => console.log(err));
    }
    if (selected === "회원명") {
      userSearchApi("mn", search)
        .then((res) => setTemp(res.data.data.memberResDtoList.dtoList))
        .catch((err) => console.log(err));
    }
    if (selected === "핸드폰") {
      userSearchApi("p", search)
        .then((res) => setTemp(res.data.data.memberResDtoList.dtoList))
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    userListApi(sort).then((res) => {
      setTemp(res.data.data.memberResDtoList.dtoList);
    });
  }, [sort, page]);

  return (
    <>
      <Header mcolor={"#fff"} text={"회원정보"} subText={"등록된 회원 00건"} />
      <Row
        justify={"space-between"}
        align={"baseline"}
        style={{ marginBottom: "20px" }}
      >
        <Row gap={15}>
          <S.Sbtn id="DESC" onClick={(e) => setSort(e.target.id)}>
            최신순
            {sort === "DESC" && <Check />}
          </S.Sbtn>
          <S.Sbtn id="ASC" onClick={(e) => setSort(e.target.id)}>
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
        <S.TableHeader>
          <tr>
            <td>분류</td>
            <td>소셜</td>
            <td>회원명</td>
            <td>핸드폰</td>
            <td>이메일</td>
            <td>APP</td>
            <td>DIVICE/IP</td>
            <td>가입일</td>
            <td>상태</td>
            <td>메모</td>
          </tr>
          <UserTemp temp={temp} onModal={onModal} page={page} items={items} />
        </S.TableHeader>
      </S.Wrapper>
      {temp.length === 0 && <None text={"유저"} />}
      {modal && <MUser setModal={setModal} selectItem={selectItem} />}
    </>
  );
};

export default User;
