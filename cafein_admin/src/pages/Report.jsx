import styled from "styled-components";
import { useState, useEffect } from "react";

import * as S from "./style copy";
import * as SS from "../components/noticesStyle";
import SelectHeader from "../components/common/SelectHeader";

import FilterRow from "../components/common/FilterRow";

import None from "../components/common/None";
import { getReportListApi } from "../util/events";

import usePagination from "../hooks/usePagination";

import MemoModal from "../components/modal/Memo";
import useSearch from "../hooks/useSearch";
import ReportItem from "../components/ReportItem";
import MUReport from "../components/modal/MUReport";

const Report = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const [search, setSearch] = useState("");
  const [selectItem, setSelectItem] = useState(null);

  // pagination
  const [page, sort, item, count, setCount, setPage, onDesc, onAsc] = usePagination(10);
  const [searchType, setSearchType, searchArr, setSearchArr] = useSearch([
    "분류",
    "회원 번호",
    "리뷰 번호",
  ]);
  //memo
  const [memoItem, setMemoItem] = useState(null);
  const [modalMemo, setModalMemo] = useState(false);
  const onResetData = () => {
    setSearchType("전체");
    setSearch("");
    setPage(1);
    onDesc();

    loadData();
  };

  const loadData = () => {
    getReportListApi(page, sort, search, searchType).then((res) => {
      setCount(res.data.data.reportCnt);
      setData(res.data.data.reportResDtoList.dtoList);
    });
  };
  const onModal = (item) => {
    setModal(true);
    setSelectItem(() => item);
  };

  useEffect(() => {
    loadData();
  }, [sort, page]);

  return (
    <>
      <SelectHeader
        menu="report"
        menu1="notice"
        menu2="qna"
        Tmenu1="공지사항"
        Tmenu2="자주 묻는 질문"
        menu3="report"
        Tmenu3="신고"
        sort={sort}
        onDesc={onDesc}
        onAsc={onAsc}
        btn
      />
      <SS.Container>
        <div>
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
            search={search}
            setSearch={setSearch}
            searchData={loadData}
            onResetData={onResetData}
          />
          <S.Wrapper isNull={data.length === 0}>
            <TableHeader>
              <div>분류</div>
              <div>내용</div>
              <div>리뷰번호</div>
              <div>신고한 회원 번호</div>
              <div>등록일</div>
              <div>상태</div>
              <div>메모</div>
            </TableHeader>
            <S.DataBox>
              {data &&
                data.map((item, i) => (
                  <ReportItem
                    key={i}
                    item={item}
                    setMemoItem={setMemoItem}
                    setModalMemo={setModalMemo}
                    loadData={onResetData}
                    onModal={onModal}
                  />
                ))}
            </S.DataBox>
          </S.Wrapper>
          {data.length == 0 && <None text="신고" />}
        </div>
      </SS.Container>
      {modalMemo && <MemoModal item={memoItem} setModal={setModalMemo} />}
      {modal && <MUReport selectItem={selectItem} setModal={setModal} />}
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
  & div:nth-child(2) {
    flex: 2.5;
  }

  & > div:last-child {
    border-right: none;
  }
`;

export default Report;
