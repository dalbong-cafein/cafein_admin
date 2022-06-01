import Header from "../components/common/header";
import * as S from "./style";

import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as Memo } from "../svg/memo.svg";
import { ReactComponent as Check } from "../svg/check.svg";
import { ReactComponent as ArrowDown } from "../svg/ArrowDown.svg";

import MReview from "../components/common/modal/MReview";
import {
  reviewDataApi,
  reviewDetailApi,
  reviewSearchApi,
} from "../util/review";
import None from "../components/None";
import DropBox from "../components/common/dropbox";
import ReviewTemp from "../components/reviewTemp";

const Review = () => {
  const [sort, setSort] = useState("DESC");
  const navigate = useNavigate();
  const [temp, setTemp] = useState([]);

  const [search, setSearch] = useState("");
  // pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(9);

  //drop
  const [isDrop, setIsDrop] = useState(false);
  const [selected, setSelected] = useState("전체");
  const [arr, setArr] = useState(["내용", "회원 번호", "카페 번호"]);

  const [modal, setModal] = useState(false);
  const [selectItem, setSelectItem] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
  };

  const onModal = (item) => {
    setModal(!modal);
    reviewDetailApi(item.reviewId)
      .then((res) => setSelectItem(res.data.data))
      .catch((err) => console.log(err));
  };

  const sortData = (id) => {
    setSort(id);
  };
  const onclick = () => {
    if (selected === "내용") {
      reviewSearchApi(search, "w").then((res) => {
        console.log(res);
        setTemp(res.data.data.reviewResDtoList.dtoList);
      });
    }
    if (selected === "회원 번호") {
      reviewSearchApi(search, "c").then((res) =>
        setTemp(res.data.data.reviewResDtoList.dtoList)
      );
    }
    if (selected === "카페 번호") {
      reviewSearchApi(search, "s").then((res) =>
        setTemp(res.data.data.reviewResDtoList.dtoList)
      );
    }
  };

  useEffect(() => {
    reviewDataApi(page, sort).then((res) => {
      setCount(res.data.data.reviewCnt);
      setTemp(res.data.data.reviewResDtoList.dtoList);
    });
  }, [page, sort]);
  return (
    <>
      <Header mcolor={"#fff"} text={"카페 리뷰"} subText={"등록된 리뷰 00건"} />
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
            <p>{selected}</p>
            <ArrowDown />
          </S.Sbtn>

          {isDrop && (
            <DropBox
              arr={arr}
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
            <td>리뷰 내용</td>
            <td>회원 번호</td>
            <td>카페 번호</td>
            <td>등록일</td>
            <td>최종 수정일</td>
            <td>메모</td>
          </tr>
          <ReviewTemp temp={temp} onModal={onModal} />
        </S.TableHeader>
      </S.Wrapper>

      {temp.length === 0 && <None text={"리뷰"} />}
      {modal && <MReview setModal={setModal} selectItem={selectItem} />}
    </>
  );
};

export default Review;
