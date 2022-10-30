import styled from "styled-components";
import { useState, useEffect } from "react";

import * as S from "./style copy";
import * as SS from "../components/noticesStyle";
import SelectHeader from "../components/common/SelectHeader";

import FilterRow from "../components/common/FilterRow";

import None from "../components/common/None";
import { getReportListApi } from "../util/events";
import { useRecoilState } from "recoil";
import { registerNotice } from "../recoil/NNotice";

import usePagination from "../hooks/usePagination";
import RegNoticeBox from "../components/RegNoticeBox";

const Report = () => {
  const [data, setData] = useState([]);
  const [selectItem, setSelectItem] = useState([]);

  const [search, setSearch] = useState("");
  const [register, setRegister] = useRecoilState(registerNotice);

  // pagination
  const [page, sort, item, count, setCount, setPage, onDesc, onAsc] = usePagination(10);

  const searchData = () => {
    // adminFeedListApi(search, page, sort)
    //   .then((res) => {
    //     setCount(res.data.data.boardCnt);
    //     setData(res.data.data.boardResDtoList.dtoList);
    //   })
    //   .catch((err) => console.log(err));
  };
  useEffect(() => {
    const copy = { ...register };
    copy.boardCategoryId = 1;
    setRegister(copy);
    getReportListApi(page, sort, search).then((res) => {
      setCount(res.data.data.boardCnt);
      setData(res.data.data.boardResDtoList.dtoList);
    });
  }, [sort, page]);

  return (
    <>
      <SelectHeader
        menu="notice"
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
            nodrop
          />
          <S.Wrapper isNull={data.length === 0}>
            <TableHeader>
              <div>분류</div>
              <div>제목</div>
              <div>등록일</div>
            </TableHeader>
            <S.DataBox>
              {data &&
                data.map((item, i) => (
                  <ItemRow key={i}>
                    <div>{String(item.boardId).padStart(6, "0")}</div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px",
                          width: "250px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          textAlign: "left",
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          width: "250px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          textAlign: "left",
                        }}
                      >
                        {item.content}
                      </p>
                    </div>

                    <div>{String(item.regDateTime).split("T")[0]}</div>
                  </ItemRow>
                ))}
            </S.DataBox>
          </S.Wrapper>
          {data.length == 0 && <None text="공지" />}
        </div>
      </SS.Container>
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
    flex: 0.5;
    border-right: 1px solid #515151;
  }
  & div:nth-child(2) {
    flex: 2.5;
  }

  & > div:last-child {
    flex: 1;
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
    flex: 0.5;
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
    flex: 1;
    border-right: none;
    border-bottom: none;
  }
`;

export default Report;
