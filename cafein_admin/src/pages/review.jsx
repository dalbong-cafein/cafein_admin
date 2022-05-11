import Header from "../components/common/header";
import * as S from "./style";

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
              <tr style={{ maxHeight: "72px" }}>
                <td>
                  <div>{item.code}</div>
                </td>
                <td>
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
                    <p style={{ textAlign: "left", maxWidth: "500px" }}>
                      {item.content.length > 80 &&
                        `${item.content.slice(0, 80)}...`}
                    </p>
                  </Row>
                </td>
                <td>{item.userNum}</td>
                <td>
                  <p>{item.code}</p>
                  <p>{item.name}</p>
                </td>
                <td>{item.registration}</td>
                <td>{item.edited}</td>
                <td>
                  <Memo />
                </td>
              </tr>
            ))}
        </S.TableHeader>
      </S.Wrapper>
    </>
  );
};

export default Review;
