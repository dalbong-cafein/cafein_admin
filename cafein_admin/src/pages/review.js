import Header from "../components/common/header";
import styled from "styled-components";

import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as Memo } from "../svg/memo.svg";

const Review = () => {
  const [isActive, setIsActive] = useState(1);
  const navigate = useNavigate();
  const temp = [
    {
      code: "000001",
      content:
        "맨날 오고싶어요 여기서 자면꿀잠 잘수있고 불면증에 추천하고 쿠키도 맛잇고 밥대신 먹고 싶어요 자면꿀잠 잘수있고 불면증에 추천하고 쿠키도 맛잇고 밥대신 먹고 싶어요",
      name: "투썸플레이스 은평구청점",
      userNum: "000001",
      registration: "03/29/2022",
      edited: "03/29/2022",
      memo: "",
      img: null,
    },
    {
      code: "000001",
      content:
        "맨날 오고싶어요 여기서 자면꿀잠 잘수있고 불면증에 추천하고 쿠키도 맛잇고 밥대신 먹고 싶어요 자면꿀잠 잘수있고 불면증에 추천하고 쿠키도 맛잇고 밥대신 먹고 싶어요",
      name: "투썸플레이스 은평구청점",
      userNum: "000001",
      registration: "03/29/2022",
      edited: "03/29/2022",
      memo: "",
      img: null,
    },
    {
      code: "000001",
      content:
        "맨날 오고싶어요 여기서 자면꿀잠 잘수있고 불면증에 추천하고 쿠키도 맛잇고 밥대신 먹고 싶어요 자면꿀잠 잘수있고 불면증에 추천하고 쿠키도 맛잇고 밥대신 먹고 싶어요",
      name: "투썸플레이스 은평구청점",
      userNum: "000001",
      registration: "03/29/2022",
      edited: "03/29/2022",
      memo: "",
      img: null,
    },
    {
      code: "000001",
      content:
        "맨날 오고싶어요 여기서 자면꿀잠 잘수있고 불면증에 추천하고 쿠키도 맛잇고 밥대신 먹고 싶어요 자면꿀잠 잘수있고 불면증에 추천하고 쿠키도 맛잇고 밥대신 먹고 싶어요",
      name: "투썸플레이스 은평구청점",
      userNum: "000001",
      registration: "03/29/2022",
      edited: "03/29/2022",
      memo: "",
      img: null,
    },
  ];

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(temp.length * 3 - 1);
  const [items, setItems] = useState(9);
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  return (
    <>
      <Header mcolor={"#fff"} text={"카페 리뷰"} subText={"등록된 리뷰 00건"} />
      <Row
        justify={"space-between"}
        align={"baseline"}
        style={{ marginBottom: "20px" }}
      >
        <Row gap={15}>
          <Sbtn onClick={() => setIsActive(2)} isTrue={isActive === 2}>
            최신순
          </Sbtn>
          <Sbtn onClick={() => setIsActive(3)} isTrue={isActive === 3}>
            오래된 순
          </Sbtn>
        </Row>
        <Row gap={15} align={"baseline"}>
          <Paging
            count={count}
            handlePageChange={handlePageChange}
            setPage={setPage}
            page={page}
          />
          <Sbtn>전체</Sbtn>
          <Row style={{ borderBottom: "1px solid #fff" }}>
            <Input
              placeholder="검색"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search onClick={onclick} />
          </Row>
        </Row>
      </Row>
      <Wrapper>
        <TableHeader>
          <tr>
            <td>분류</td>
            <td>리뷰 내용</td>
            <td>회원 번호</td>
            <td>카페 번호</td>
            <td>등록일</td>
            <td>최종 수정일</td>
            <td>메모</td>
          </tr>

          {temp
            .concat(temp)
            .concat(temp)
            .slice(items * (page - 1), items * (page - 1) + items)
            .map((item) => (
              <tr height="72px">
                <td>
                  <div>{item.code}</div>
                </td>
                <td>
                  <Row gap={16} align={"center"}>
                    {item.img ? (
                      <Photo>
                        z
                        <img
                          src={process.env.PUBLIC_URL + item.img}
                          alt="pic"
                        />
                      </Photo>
                    ) : (
                      <NonePic>대표 사진</NonePic>
                    )}
                    <p>{item.content}</p>
                  </Row>
                </td>
                <td>{item.userNum}</td>
                <td>{`${item.code}\n${item.name}`}</td>
                <td>{item.registration}</td>
                <td>{item.edited}</td>
                <td>
                  <Memo />
                </td>
              </tr>
            ))}
        </TableHeader>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  border-radius: 8px;
  border: 1px solid #404040;
`;

const TableHeader = styled.table`
  text-align: center;
  font-size: 14px;
  color: #e3e3e3;
  width: 100%;

  border-spacing: 0;
  border-collapse: collapse;
  border-style: hidden;

  & > th,
  td {
    padding: 16px;
    border: 1px solid #404040;
    max-heightL 72px;
  }
  & > tr:first-child {
    color: #8b8b8b;
    max-heightL 72px;

  }
`;

const Input = styled.input`
  border: 0;
  background-color: #000;
  color: #fff;
  width: 220px;
  height: 32px;
  &:focus {
    outline: none;
  }
`;

const Photo = styled.div`
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: relative;
  position: relative;
  & > img {
    position: absolute;
    transform: translate(-50%, 0);
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 9;
  }
`;

const NonePic = styled.div`
  width: 40px;
  height: 40px;
  background-color: #fff;
  color: #000;
  font-size: 10px;
  line-height: 40px;
`;

const Sbtn = styled.div`
  width: 102px;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  color: #fff;
  background-color: ${(props) => (props.isTrue ? "#2563EB" : "#333333")};
  border-radius: 6px;
  padding: auto 0;
  text-align: center;
  cursor: pointer;
`;

export default Review;
