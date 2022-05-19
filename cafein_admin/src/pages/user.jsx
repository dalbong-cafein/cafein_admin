import Header from "../components/common/header";

import * as S from "./style";

import { useState } from "react";
import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as Memo } from "../svg/memo.svg";
import styled from "styled-components";
import MUser from "../components/common/modal/MUser";
const User = () => {
  const [isActive, setIsActive] = useState(1);
  const temp = [
    {
      code: "000001",
      social: ["kakao", "naver"],
      name: "우하핫",
      phoneNum: "010-1234-2345",
      email: "testtest@gmail.com",
      app: "1.0.0",
      divice: "ios iphone 12.1",
      ip: "000 000 000 000",
      join: "03/29/2022",
      state: "기본",
      memo: "",
      img: "/캡처.PNG",
    },
    {
      code: "000001",
      social: ["kakao"],
      name: "우하핫",
      phoneNum: "010-1234-2345",
      email: "testtest@gmail.com",
      app: "1.0.0",
      divice: "ios iphone 12.1",
      ip: "000 000 000 000",
      join: "03/29/2022",
      state: "신고",
      memo: "",
      img: "/캡처.PNG",
    },
    {
      code: "000001",
      social: ["naver", "kakao"],
      name: "우하핫핫!!",
      phoneNum: "010-1234-2345",
      email: "testtest@gmail.com",
      app: "1.0.0",
      divice: "ios iphone 12.1",
      ip: "000 000 000 000",
      join: "03/29/2022",
      state: "탈퇴",
      memo: "",
      img: "/캡처.PNG",
    },
  ];

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(temp.length * 3 - 1);
  const [items, setItems] = useState(9);
  const [modal, setModal] = useState(false);
  const [selectItem, setSelectItem] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  const onModal = (item) => {
    setModal(!modal);
    console.log(item);
    setSelectItem(item);
  };

  return (
    <>
      <Header mcolor={"#fff"} text={"회원정보"} subText={"등록된 회원 00건"} />
      <Row
        justify={"space-between"}
        align={"baseline"}
        style={{ marginBottom: "20px" }}
      >
        <Row gap={15}>
          <S.Sbtn onClick={() => setIsActive(2)} isTrue={isActive === 2}>
            최신순
          </S.Sbtn>
          <S.Sbtn onClick={() => setIsActive(3)} isTrue={isActive === 3}>
            오래된 순
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
      <S.Wrapper>
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

          {temp
            .concat(temp)
            .concat(temp)
            .slice(items * (page - 1), items * (page - 1) + items)
            .map((item, i) => (
              <tr height="72px" key={i}>
                <td onClick={() => onModal(item)}>
                  <div>{item.code}</div>
                </td>
                <td onClick={() => onModal(item)}>
                  <p style={{ color: "#FC7521" }}>{item.social[0]}</p>
                  {item.social[1] && <p>{item.social[1]}</p>}
                </td>
                <td onClick={() => onModal(item)}>
                  <Row gap={16} align={"center"}>
                    {item.img ? (
                      <S.Photo>
                        z
                        <img
                          src={process.env.PUBLIC_URL + item.img}
                          alt="pic"
                        />
                      </S.Photo>
                    ) : (
                      <S.NonePic>대표 사진</S.NonePic>
                    )}
                    <p>{item.name}</p>
                  </Row>
                </td>
                <td onClick={() => onModal(item)}>{item.phoneNum}</td>
                <td onClick={() => onModal(item)}>{item.email}</td>
                <td onClick={() => onModal(item)}>{item.app}</td>
                <td onClick={() => onModal(item)}>
                  <p>{item.divice}</p>
                  <p>{item.ip}</p>
                </td>
                <td onClick={() => onModal(item)}>{item.join}</td>
                <td onClick={() => onModal(item)}>
                  <Btn content={item.state}>{item.state}</Btn>
                </td>
                <td>
                  <Memo />
                </td>
              </tr>
            ))}
        </S.TableHeader>
      </S.Wrapper>
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
