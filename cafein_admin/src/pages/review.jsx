import Header from "../components/common/header";
import * as S from "./style copy";
import styled from "styled-components";

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
import MemoModal from "../components/common/modal/memo";

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

  const [memoId, setMemoId] = useState(null);
  const [memoModal, setMemoModal] = useState(false);
  const [selectItem2, setSelectItem2] = useState([]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const onModal = (item) => {
    reviewDetailApi(item.reviewId)
      .then((res) => {
        console.log(res);
        setSelectItem2(res.data.data);
        setModal(!modal);
      })
      .catch((err) => console.log(err));
  };

  const sortData = (id) => {
    setSort(id);
  };
  const onclick = () => {
    setSort("DESC");
    setPage(1);
    searchData();
  };

  const searchData = () => {
    if (selected === "내용") {
      reviewSearchApi(search, "w", page, sort).then((res) => {
        setTemp(res.data.data.reviewResDtoList.dtoList);
      });
    }
    if (selected === "회원 번호") {
      reviewSearchApi(search, "c", page, sort).then((res) => {
        console.log(res);
        setTemp(res.data.data.reviewResDtoList.dtoList);
      });
    }
    if (selected === "카페 번호") {
      reviewSearchApi(search, "s", page, sort).then((res) =>
        setTemp(res.data.data.reviewResDtoList.dtoList)
      );
    }
  };

  const changeData = () => {
    if (selected === "전체") {
      reviewDataApi(page, sort)
        .then((res) => {
          setCount(res.data.data.reviewCnt);
          setTemp(res.data.data.reviewResDtoList.dtoList);
        })
        .catch((err) => console.log(err));
    } else {
      searchData();
    }
  };

  useEffect(() => {
    changeData();
  }, [page, sort]);
  return (
    <>
      <Header
        mcolor={"#fff"}
        text={"카페 리뷰"}
        subText={`등록된 리뷰 ${count}건`}
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
        <TableHeader>
          <div>분류</div>
          <div>리뷰 내용</div>
          <div>회원 번호</div>
          <div>카페 번호</div>
          <div>등록일</div>
          <div>최종 수정일</div>
          <div>메모</div>
        </TableHeader>

        <ReviewTemp
          temp={temp}
          onModal={onModal}
          setMemoModal={setMemoModal}
          setMemoId={setMemoId}
          setSelectItem={setSelectItem2}
        />
      </S.Wrapper>

      {memoModal && (
        <MemoModal
          memoId={memoId}
          setModal={setMemoModal}
          selectItem={selectItem2}
        />
      )}
      {temp.length === 0 && <None text={"리뷰"} />}
      {modal && <MReview setModal={setModal} selectItem2={selectItem2} />}
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
    flex: 1;
    border-right: 1px solid #515151;
  }
  & > div:nth-child(2) {
    flex: 3;
  }
  & > div:nth-child(4) {
    flex: 1.5;
  }

  & > div:last-child {
    border-right: none;
  }
`;

export default Review;
