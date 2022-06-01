import Header from "../components/common/header";

import * as S from "./style";

import { useEffect, useState } from "react";
import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as Memo } from "../svg/memo.svg";
import { ReactComponent as Check } from "../svg/check.svg";

import styled from "styled-components";
import MUser from "../components/common/modal/MUser";
import { userListApi } from "../util/user";
import None from "../components/None";
const User = () => {
  const [isActive, setIsActive] = useState(1);
  const [temp, setTemp] = useState([]);

  const [search, setSearch] = useState("");

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
    setModal(!modal);
    console.log(item);
    setSelectItem(item);
  };

  useEffect(() => {
    userListApi().then((res) => {
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
          <S.Sbtn>전체</S.Sbtn>
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

          {temp &&
            temp
              .slice(items * (page - 1), items * (page - 1) + items)
              .map((item, i) => (
                <tr key={i}>
                  <td onClick={() => onModal(item)}>
                    <div>{String(item.memberId).padStart(5, "0")}</div>
                  </td>
                  <td onClick={() => onModal(item)}>
                    <p style={{ color: "#FC7521" }}>{item.socialTypeList[0]}</p>
                    {item.socialTypeList[1] && <p>{item.socialTypeList[1]}</p>}
                  </td>
                  <td onClick={() => onModal(item)}>
                    <Row gap={16} align={"center"}>
                      {item.memberImageDto ? (
                        <S.Photo img={item.memberImageDto.imageUrl} />
                      ) : (
                        <S.NonePic />
                      )}
                      <p>{item.nickname || "-"}</p>
                    </Row>
                  </td>
                  <td onClick={() => onModal(item)}>{item.phone || "-"}</td>
                  <td onClick={() => onModal(item)}>{item.email}</td>
                  <td onClick={() => onModal(item)}>{item.app || "-"}</td>
                  <td onClick={() => onModal(item)}>
                    <p>{item.divice || "-"}</p>
                    <p>{item.ip || "-"}</p>
                  </td>
                  <td onClick={() => onModal(item)}>
                    {item.regDateTime || "-"}
                  </td>
                  <td onClick={() => onModal(item)}>
                    <Btn
                      content={
                        !item.isReported && !item.isDeleted
                          ? "기본"
                          : item.isReported
                          ? "신고"
                          : "탈퇴"
                      }
                    >
                      {!item.isReported && !item.isDeleted
                        ? "기본"
                        : item.isReported
                        ? "신고"
                        : "탈퇴"}
                    </Btn>
                  </td>
                  <td>
                    <Memo />
                  </td>
                </tr>
              ))}
        </S.TableHeader>
      </S.Wrapper>
      {temp.length === 0 && <None text={"유저"} />}
      {modal && <MUser setModal={setModal} selectItem={selectItem} />}
    </>
  );
};

const Btn = styled.div`
  background-color: ${(props) =>
    props.content === "기본"
      ? "#26BA6A"
      : props.content === "신고"
      ? "#f44336"
      : "#ff9800"};
  width: 86px;
  height: 26px;
  text-align: center;
  margin: 0 auto;
  opacity: 0.3;

  border-radius: 6px;
  color: #fff;
  line-height: 26px;
`;

export default User;
