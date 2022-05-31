import Paging from "../components/common/Pagination";

import * as S from "../pages/style";
import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as Memo } from "../svg/memo.svg";
import { ReactComponent as Check } from "../svg/check.svg";
import { ReactComponent as ArrowDown } from "../svg/ArrowDown.svg";

import Row from "../components/atoms/row";
import None from "./None";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { marketingListApi } from "../util/events";
import DropBox from "./common/dropbox";
import RedAlert from "./common/modal/redAlert";
const Marketings = () => {
  useEffect(() => {
    marketingListApi(page, sort).then((res) => {
      setCount(res.data.data.couponCnt);
      setTemp(res.data.data.couponResDtoList.dtoList);
    });
  }, []);
  const [search, setSearch] = useState("");

  const [isActive, setIsActive] = useState(1);
  const navigate = useNavigate();
  const [sort, setSort] = useState("DESC");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);
  const [temp, setTemp] = useState([]);
  const [items, setItems] = useState(12);

  const [alert, setAlert] = useState(false);
  const handlePageChange = (page) => {
    setPage(page);
    marketingListApi(page, sort).then((res) => {
      setTemp(res.data.data.couponResDtoList.dtoList);
    });
  };

  const sortData = (id) => {
    setSort(id);
    marketingListApi(page, sort).then((res) => {
      setTemp(res.data.data.couponResDtoList.dtoList);
    });
  };

  //drop
  const [isDrop, setIsDrop] = useState(false);
  const [selected, setSelected] = useState("전체");
  const [arr, setArr] = useState(["분류", "회원 번호", "핸드폰"]);

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
              left={"115%"}
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
          <tbody>
            {temp &&
              temp.map((item, i) => (
                <tr key={i}>
                  <td style={{ textAlign: "center" }}>
                    {String(item.couponId).padStart(5, "0")}
                  </td>
                  <td>{item.brandName}</td>
                  <td>{item.itemName}</td>
                  <td style={{ textAlign: "center" }}>
                    {String(item.memberId).padStart(5, "0")}
                  </td>
                  <td>{item.phone || "-"}</td>
                  <td>{item.regDateTime}</td>
                  <td style={{ textAlign: "center" }}>
                    {item.processingDateTime || "-"}
                  </td>
                  <td>
                    <S.Btn
                      content={item.state}
                      onClick={() => setAlert(!alert)}
                    >
                      {item.state ? "완료" : "미완료"}
                    </S.Btn>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Memo />
                  </td>
                </tr>
              ))}
          </tbody>
        </S.TableHeader>
      </S.Wrapper>
      {alert && (
        <RedAlert
          text={"마케팅 서비스 상태 변경"}
          text2={"'완료'"}
          text3={"로 상태를 변경하시겠습니까?"}
          setAlert={setAlert}
        />
      )}
      {temp.length === 0 && <None text={"마케팅 서비스"} />}
    </>
  );
};

export default Marketings;
