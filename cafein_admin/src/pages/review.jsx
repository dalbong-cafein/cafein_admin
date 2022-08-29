import Header from "../components/common/header";
import * as S from "./style copy";
import styled from "styled-components";

import { useState, useEffect } from "react";
import usePagination from "../hooks/usePagination";
import useSearch from "../hooks/useSearch";

import ReviewModal from "../components/common/modal/ReviewDetailModal";
import {
  reviewDataApi,
  reviewDetailApi,
  reviewSearchApi,
} from "../util/review";
import None from "../components/None";
import ReviewTemp from "../components/ReviewItem";
import MemoModal from "../components/common/modal/Memo";
import FilterRow from "../components/common/filterRow";

const Review = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  // pagination
  const [page, sort, item, count, setCount, setPage, onDesc, onAsc] =
    usePagination();

  //drop
  const [searchType, setSearchType, searchArr, setSearchArr] = useSearch([
    "내용",
    "회원 번호",
    "카페 번호",
  ]);

  const [modal, setModal] = useState(false);
  const [detailReviewId, setDetailReviewId] = useState([]);

  const [memoItem, setMemoItem] = useState(null);
  const [memoModal, setMemoModal] = useState(false);

  const onModal = (item) => {
    setModal(!modal);
    setDetailReviewId(item.reviewId);
  };

  const searchData = () => {
    reviewSearchApi(search, searchType, page, sort).then((res) => {
      setData(res.data.data.reviewResDtoList.dtoList);
    });
  };

  const changeData = () => {
    if (searchType === "전체") {
      reviewDataApi(page, sort)
        .then((res) => {
          setCount(res.data.data.reviewCnt);
          setData(res.data.data.reviewResDtoList.dtoList);
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
      <FilterRow
        searchType={searchType}
        setSearchType={setSearchType}
        searchArr={searchArr}
        setSearchArr={setSearchArr}
        sort={sort}
        count={count}
        page={page}
        item={item}
        onAsc={onAsc}
        onDesc={onDesc}
        setPage={setPage}
        searchData={searchData}
        search={search}
        setSearch={setSearch}
      />
      <S.Wrapper isNull={data.length === 0}>
        <TableHeader>
          <div>분류</div>
          <div>추천</div>
          <div>리뷰 내용</div>
          <div>회원 번호</div>
          <div>카페 번호</div>
          <div>등록일</div>
          <div>최종 수정일</div>
          <div>메모</div>
        </TableHeader>

        <ReviewTemp
          data={data}
          onModal={onModal}
          setMemoModal={setMemoModal}
          setMemoItem={setMemoItem}
        />
      </S.Wrapper>

      {data.length === 0 && <None text="리뷰" />}
      {memoModal && <MemoModal item={memoItem} setModal={setMemoModal} />}
      {modal && (
        <ReviewModal setModal={setModal} detailReviewId={detailReviewId} />
      )}
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
    flex: 0.7;
    border-right: 1px solid #515151;
  }
  & > div:nth-child(3) {
    flex: 4;
  }
  & > div:nth-child(5) {
    flex: 1.5;
  }

  & > div:last-child {
    flex: 0.5;
    border-right: none;
  }
`;

export default Review;
