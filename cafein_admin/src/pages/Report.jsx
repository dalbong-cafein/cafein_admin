import styled from "styled-components";
import { useState, useEffect } from "react";

import * as S from "./style copy";
import * as SS from "../components/noticesStyle";
import SelectHeader from "../components/common/SelectHeader";

import FilterRow from "../components/common/FilterRow";

import None from "../components/common/None";
import { getReportListApi } from "../util/events";

import usePagination from "../hooks/usePagination";
import { ReactComponent as Memo } from "../svg/memo.svg";
import { ReactComponent as Check } from "../svg/ArrowDown.svg";

import MemoModal from "../components/modal/Memo";

const Report = () => {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");

  // pagination
  const [page, sort, item, count, setCount, setPage, onDesc, onAsc] = usePagination(10);
  //memo
  const [memoItem, setMemoItem] = useState(null);
  const [modalMemo, setModalMemo] = useState(false);
  const searchData = () => {
    // adminFeedListApi(search, page, sort)
    //   .then((res) => {
    //     setCount(res.data.data.boardCnt);
    //     setData(res.data.data.boardResDtoList.dtoList);
    //   })
    //   .catch((err) => console.log(err));
  };

  const loadData = () => {
    getReportListApi(page, sort, search).then((res) => {
      setCount(res.data.data.reportCnt);
      setData(res.data.data.reportResDtoList.dtoList);
    });
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
            sort={sort}
            count={count}
            page={page}
            item={item}
            onAsc={onAsc}
            onDesc={onDesc}
            setPage={setPage}
            search={search}
            setSearch={setSearch}
            searchData={searchData}
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
                  <ItemRow key={i} hasMemoId={item.memoId}>
                    <div>{String(item.reportId).padStart(6, "0")}</div>
                    <div>
                      <p
                        style={{
                          marginBottom: "5px",
                          overflow: "hidden",
                          width: "100%",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          textAlign: "center",
                        }}
                      >
                        {item.categoryName}
                      </p>
                    </div>

                    <div>{String(item.reviewId).split("T")[0] || "-"}</div>
                    <div>{String(item.fromMemberId).split("T")[0] || "-"}</div>
                    <div>{String(item.regDateTime).split("T")[0] || "-"}</div>
                    <div>
                      <Btn content={item.reportStatus}>
                        <div />
                        {item.reportStatus === "APPROVAL"
                          ? "승인"
                          : item.reportStatus === "REJECT"
                          ? "반려"
                          : "대기"}
                        {item.reportStatus === "WAIT" && (
                          <Check style={{ paddingBottom: "2px", paddingLeft: "3px" }} />
                        )}
                      </Btn>
                    </div>
                    <div>
                      <Memo
                        onClick={() => {
                          setMemoItem(item);
                          setModalMemo(true);
                        }}
                      />
                    </div>
                  </ItemRow>
                ))}
            </S.DataBox>
          </S.Wrapper>
          {data.length == 0 && <None text="공지" />}
        </div>
      </SS.Container>
      {modalMemo && <MemoModal item={memoItem} setModal={setModalMemo} />}
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

const ItemRow = styled.div`
  display: flex;
  color: #e3e3e3;
  height: calc(65vh / 9);
  cursor: pointer;
  border-bottom: 1px solid #515151;
  font-size: 14px;
  & > div {
    // padding: 0 0 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    line-height: 18px;
    box-sizing: border-box;
    flex: 1;
    border-right: 1px solid #515151;
  }

  & div:nth-child(2) {
    flex: 2.5;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    & > p {
      margin: 0 0 0 16px;
    }
  }

  & > div:last-child {
    border-right: none;
    border-bottom: none;
    & > svg {
      path {
        fill: ${(props) => (props.hasMemoId ? "#E3E3E3" : "#646464")};
      }
    }
  }
`;

const Btn = styled.div`
  position: relative;
  width: 86px;
  height: 26px;
  text-align: center;
  margin: 0 auto;
  border-radius: 6px;
  color: ${(props) =>
    props.content === "APPROVAL" ? "#26BA6A" : props.content === "REJECT" ? "#f44336" : "#ff9800"};
  line-height: 26px;
  & > div:first-child {
    position: absolute;
    width: 86px;
    height: 26px;
    background-color: ${(props) =>
      props.content === "APPROVAL"
        ? "#26BA6A"
        : props.content === "REJECT"
        ? "#f44336"
        : "#ff9800"};
    opacity: 0.3;
    border-radius: 4px;
  }
`;

export default Report;
