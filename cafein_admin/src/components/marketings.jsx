import Paging from "../components/common/Pagination";

import * as S from "../pages/style";
import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as Check } from "../svg/check.svg";
import { ReactComponent as ArrowDown } from "../svg/ArrowDown.svg";

import Row from "../components/atoms/row";
import None from "./None";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  changeStateApi,
  marketingListApi,
  marketingSearchApi,
} from "../util/events";
import DropBox from "./common/dropbox";
import RedAlert from "./common/modal/redAlert";
import MarketingsTemp from "./marketingsTemp";
import MemoModal from "./common/modal/Memo";
const Marketings = () => {
  const [search, setSearch] = useState("");

  const [isActive, setIsActive] = useState(1);
  const navigate = useNavigate();
  const [sort, setSort] = useState("DESC");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [temp, setTemp] = useState([]);
  const [items, setItems] = useState(12);
  const [reportId, setReportId] = useState(null);

  const [alert, setAlert] = useState(false);

  const [memoItem, setMemoItem] = useState(null);
  const [memoModal, setMemoModal] = useState(false);
  const [selectItem, setSelectItem] = useState([]);

  //drop
  const [isDrop, setIsDrop] = useState(false);
  const [selected, setSelected] = useState("전체");
  const [arr, setArr] = useState(["분류", "회원 번호", "핸드폰"]);

  const searchData = () => {
    if (selected === "회원 번호") {
      marketingSearchApi("m", search, page, sort)
        .then((res) => {
          setTemp(res.data.data.couponResDtoList.dtoList);
          setCount(res.data.data.couponCnt);
        })
        .catch((err) => console.log(err));
    }
    if (selected === "분류") {
      marketingSearchApi("cp", search, page, sort)
        .then((res) => {
          setTemp(res.data.data.couponResDtoList.dtoList);
          setCount(res.data.data.couponCnt);
        })
        .catch((err) => console.log(err));
    }
    if (selected === "핸드폰") {
      marketingSearchApi("p", search, page, sort)
        .then((res) => {
          setTemp(res.data.data.couponResDtoList.dtoList);
          setCount(res.data.data.couponCnt);
        })
        .catch((err) => console.log(err));
    }
  };

  const changeData = () => {
    if (selected === "전체") {
      marketingListApi(page, sort)
        .then((res) => {
          setCount(res.data.data.couponCnt);
          setTemp(res.data.data.couponResDtoList.dtoList);
        })
        .catch((err) => console.log(err));
    } else {
      searchData();
    }
  };
  const onclick = () => {
    setSort("DESC");
    setPage(1);
    searchData();
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const sortData = async (id) => {
    setSort(id);
  };

  const changeState = (id) => {
    changeStateApi(id)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    changeData();
  }, [page, sort]);

  return (
    <>
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
              left={"150%"}
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
          <tr style={{ textAlign: "center" }}>
            <td>분류</td>
            <td>브랜드</td>
            <td>상품명</td>
            <td>회원번호</td>
            <td>핸드폰</td>
            <td>신청일</td>
            <td>처리일</td>
            <td>상태</td>
            <td>메모</td>
          </tr>
          <MarketingsTemp
            temp={temp}
            page={page}
            items={items}
            setAlert={setAlert}
            alert={alert}
            setReportId={setReportId}
            setMemoItem={setMemoItem}
            setSelectItem={setSelectItem}
            setMemoModal={setMemoModal}
          />
        </S.TableHeader>
      </S.Wrapper>
      {alert && (
        <RedAlert
          text={"마케팅 서비스 상태 변경"}
          text2={"'완료'"}
          text3={"로 상태를 변경하시겠습니까?"}
          setAlert={setAlert}
          func={changeState}
          forFunc={reportId}
        />
      )}

      {memoModal && <MemoModal item={memoItem} setModal={setMemoModal} />}
      {temp.length === 0 && <None text={"마케팅 서비스"} />}
    </>
  );
};

export default Marketings;
