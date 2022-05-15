import { useState } from "react";
import Header from "../components/common/header";

import * as S from "./style";
import styled from "styled-components";

import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Memo } from "../svg/memo.svg";
import None from "../components/None";

const Marketing = () => {
  const temp = [
    // {
    //   code: "1",
    //   brand: "스타벅스",
    //   content: "스타벅스 기프티콘",
    //   userNum: "000001",
    //   userPhoneNum: "010-0000-0000",
    //   registration: "03/29/2022",
    //   paymentDate: "03/29/2022",
    //   memo: "",
    //   state: "미완료",
    // },
    // {
    //   code: "1",
    //   brand: "스타벅스",
    //   content: "스타벅스 기프티콘",
    //   userNum: "000001",
    //   userPhoneNum: "010-0000-0000",
    //   registration: "03/29/2022",
    //   paymentDate: "03/29/2022",
    //   memo: "",
    //   state: "완료",
    // },
    // {
    //   code: "1",
    //   brand: "스타벅스",
    //   content: "스타벅스 기프티콘",
    //   userNum: "000001",
    //   userPhoneNum: "010-0000-0000",
    //   registration: "03/29/2022",
    //   paymentDate: "03/29/2022",
    //   memo: "",
    //   state: "미완료",
    // },
    // {
    //   code: "1",
    //   brand: "스타벅스",
    //   content: "스타벅스 기프티콘",
    //   userNum: "000001",
    //   userPhoneNum: "010-0000-0000",
    //   registration: "03/29/2022",
    //   paymentDate: "03/29/2022",
    //   memo: "",
    //   state: "완료",
    // },
  ];

  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(1);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(temp.length * 3 - 1);
  const [items, setItems] = useState(12);
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };
  return (
    <>
      <Header text={"마케팅 서비스"} />
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
            <td>브랜드</td>
            <td>상품명</td>
            <td>회원번호</td>
            <td>핸드폰</td>
            <td>신청일</td>
            <td>처리일</td>
            <td>상태</td>
            <td>메모</td>
          </tr>
          <>
            {temp
              .concat(temp)
              .concat(temp)
              .slice(items * (page - 1), items * (page - 1) + items)
              .map((item) => (
                <tr style={{ maxHeight: "72px" }}>
                  <td>{item.code}</td>
                  <td>{item.brand}</td>
                  <td>{item.content}</td>
                  <td>{item.userNum}</td>
                  <td>{item.userPhoneNum}</td>
                  <td>{item.registration}</td>
                  <td>{item.paymentDate}</td>
                  <td>
                    <Btn content={item.state}>{item.state}</Btn>
                  </td>
                  <td>
                    <Memo />
                  </td>
                </tr>
              ))}
          </>
        </S.TableHeader>
        {temp.length === 0 && <None text={"마케팅 서비스"} />}
      </S.Wrapper>
    </>
  );
};

const Btn = styled.div`
  margin: 0 auto;
  background-color: ${(props) =>
    props.content === "완료" ? "#26BA6A" : "#f44336"};
  width: 96px;
  height: 26px;
  text-align: center;
  opacity: 0.3;

  border-radius: 6px;
  color: #fff;
  line-height: 26px;
`;
export default Marketing;
