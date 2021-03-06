import { useEffect, useState } from "react";
import * as S from "./style copy";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Row from "../components/atoms/row";
import Paging from "../components/common/Pagination";
import Header from "../components/common/header";
import MemoModal from "../components/common/modal/memo";
import DropBox from "../components/common/dropbox";
import None from "../components/None";
import CafeDetailModal from "../components/common/modal/cafeDetail";
import ManagementTemp from "../components/managementTemp";

import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as ArrowDown } from "../svg/ArrowDown.svg";
import { ReactComponent as Check } from "../svg/check.svg";

import {
  feedDataApi,
  feedDetailApi,
  feedDetailDataApi,
  feedSearchApi,
} from "../util/management";

const ManagementCafe = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState("DESC");
  const [temp, setTemp] = useState([]);
  const [search, setSearch] = useState("");

  //detail
  const [dModal, setDModal] = useState(false);
  const [dSelected, setDSelected] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  //drop
  const [isDrop, setIsDrop] = useState(false);
  const [selected, setSelected] = useState("전체");
  const [arr, setArr] = useState(["분류", "카페명", "위치"]);

  //memo
  const [memoId, setMemoId] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectItem, setSelectItem] = useState([]);

  // pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(9);

  const changeData = () => {
    if (selected === "전체") {
      feedDataApi(page, sort)
        .then((res) => {
          setCount(res.data.data.storeCnt);
          setTemp(res.data.data.storeResDtoList.dtoList);
        })
        .catch((err) => console.log(err));
    } else {
      searchData();
    }
  };

  const searchData = () => {
    if (selected === "카페명") {
      feedSearchApi(search, "sn", page, sort)
        .then((res) => {
          setTemp(res.data.data.storeResDtoList.dtoList);
          setCount(res.data.data.storeCnt);
        })
        .catch((err) => console.log(err));
    }
    if (selected === "분류") {
      feedSearchApi(search, "s", page, sort)
        .then((res) => {
          setTemp(res.data.data.storeResDtoList.dtoList);
          setCount(res.data.data.storeCnt);
        })
        .catch((err) => console.log(err));
    }
    if (selected === "위치") {
      feedSearchApi(search, "a", page, sort)
        .then((res) => {
          setTemp(res.data.data.storeResDtoList.dtoList);
          setCount(res.data.data.storeCnt);
        })
        .catch((err) => console.log(err));
    }
  };

  const detailModal = (item) => {
    feedDetailApi(item.storeId)
      .then((res) => {
        setDSelected(res.data.data);
        feedDetailDataApi(res.data.data.storeId).then((res) => {
          setReviewData(res.data.data);
        });
      })
      .catch((err) => console.log(err));
    setDModal(!dModal);
  };

  const onclick = async () => {
    await setSort("DESC");
    await setPage(1);
    searchData();
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const sortData = (id) => {
    setSort(id);
  };

  useEffect(() => {
    changeData();
  }, [page, sort]);
  return (
    <>
      <Header
        mcolor={"#fff"}
        text={"카페 관리"}
        subText={`등록된 카페 ${count}건`}
      />
      <Row
        justify={"space-between"}
        align={"baseline"}
        style={{ marginBottom: "20px" }}
      >
        <Row gap={15}>
          <S.Sbtn
            onClick={() => {
              navigate("/management/register");
            }}
            color={"#2563EB"}
          >
            새 카페 등록
          </S.Sbtn>
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
          <div>카페명</div>
          <div>위치</div>
          <div>연락처</div>
          <div>혼잡도</div>
          <div>리뷰</div>
          <div>등록일</div>
          <div>최종 수정일</div>
          <div>메모</div>
        </TableHeader>

        <ManagementTemp
          temp={temp}
          setModal={setModal}
          detailModal={detailModal}
          setMemoId={setMemoId}
          setSelectItem={setSelectItem}
        />
      </S.Wrapper>
      {temp.length === 0 && (
        <None
          text={"카페"}
          text2={"새 카페 등록"}
          href={"/management/register"}
        />
      )}
      {modal && (
        <MemoModal
          memoId={memoId}
          setModal={setModal}
          selectItem={selectItem}
        />
      )}
      {dModal && (
        <CafeDetailModal
          data={reviewData}
          setDModal={setDModal}
          dSelected={dSelected}
        />
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
    flex: 1;
    border-right: 1px solid #515151;
  }
  & > div:nth-child(3),
  div:nth-child(2) {
    flex: 2.5;
  }

  & > div:last-child {
    border-right: none;
  }
`;

export default ManagementCafe;
