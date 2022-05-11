import { useState } from "react";
import * as S from "./style";
import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as Memo } from "../svg/memo.svg";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/header";
import MemoModal from "../components/common/modal/memo";

const ManagementCafe = ({ setSubText }) => {
  const [isActive, setIsActive] = useState(1);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const temp = [
    {
      code: "000001",
      name: "투썸플레이스 은평구청점",
      location: "위치어쩌구저쩌구 여기저기어쩌구",
      phoneNum: "0-1234-2345",
      congestion: "여유",
      review: "245",
      registration: "03/29/2022",
      edited: "03/29/2022",
      memo: "",
      img: "/캡처.PNG",
    },

    {
      code: "000001",
      name: "투썸플레이스 은평구청점",
      location: "위치어쩌구저쩌구 ddddddddddddd",
      phoneNum: "0-1234-2345",
      congestion: "여유",
      review: "245",
      registration: "03/29/2022",
      edited: "03/29/2022",
      memo: "",
      img: null,
    },
    {
      code: "000001",
      name: "투썸플레이스 은평구청점",
      location: "위치어쩌구저쩌구 여기저기어쩌구",
      phoneNum: "0-1234-2345",
      congestion: "여유",
      review: "245",
      registration: "03/29/2022",
      edited: "03/29/2022",
      memo: "",
      img: null,
    },
    {
      code: "000001",
      name: "투썸플레이스 은평구청점",
      location: "위치어쩌구저쩌구 kkkkk",
      phoneNum: "0-1234-2345",
      congestion: "여유",
      review: "245",
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
      <Header mcolor={"#fff"} text={"카페 관리"} subText={"등록된 카페 00건"} />
      <Row
        justify={"space-between"}
        align={"baseline"}
        style={{ marginBottom: "20px" }}
      >
        <Row gap={15}>
          <S.Sbtn
            onClick={() => {
              navigate("/management/register");
              setSubText("새 카페 등록");
            }}
            isTrue={isActive === 1}
          >
            새 카페 등록
          </S.Sbtn>
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
            <td>카페명</td>
            <td>위치</td>
            <td>연락처</td>
            <td>혼잡도</td>
            <td>리뷰</td>
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
                <td>{item.location}</td>
                <td>{item.phoneNum}</td>
                <td>{item.congestion}</td>
                <td>{item.review}건</td>
                <td>{item.registration}</td>
                <td>{item.edited}</td>
                <td>
                  <Memo onClick={() => setModal(true)} />
                </td>
              </tr>
            ))}
        </S.TableHeader>
      </S.Wrapper>
      {modal && <MemoModal setModal={setModal} />}
    </>
  );
};

export default ManagementCafe;
