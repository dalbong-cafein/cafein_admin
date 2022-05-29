import { useEffect, useState } from "react";
import * as S from "./style";
import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as Memo } from "../svg/memo.svg";
import { ReactComponent as ArrowDown } from "../svg/ArrowDown.svg";
import { ReactComponent as Check } from "../svg/check.svg";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/header";
import MemoModal from "../components/common/modal/memo";
import DropBox from "../components/common/dropbox";
import { feedDataApi } from "../util/management";
import None from "../components/None";

const ManagementCafe = () => {
  useEffect(() => {
    feedDataApi(page, sort).then((res) => {
      setCount(res.data.data.storeCnt);
      setTemp(res.data.data.storeResDtoList.dtoList);
      console.log(res);
    });
  }, []);

  const [sort, setSort] = useState("DESC");
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [temp, setTemp] = useState([]);

  const [search, setSearch] = useState("");
  const [isDrop, setIsDrop] = useState(false);
  const [selected, setSelected] = useState("전체");
  const [arr, setArr] = useState(["분류", "카페명", "위치"]);

  // pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);
  const [items, setItems] = useState(9);
  const handlePageChange = (page) => {
    setPage(page);
    feedDataApi(page, sort).then((res) => {
      setTemp(res.data.data.storeResDtoList.dtoList);
    });
  };

  const sortData = (id) => {
    setSort(id);
    feedDataApi(page, sort).then((res) => {
      setTemp(res.data.data.storeResDtoList.dtoList);
      console.log(res);
    });
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
          <tbody>
            {temp &&
              temp.map((item, i) => (
                <tr key={i}>
                  <td>
                    <span>{String(item.storeId).padStart(5, "0")}</span>
                  </td>
                  <td>
                    <Row gap={16} align={"center"}>
                      {item.storeImageDto ? (
                        <S.Photo img={item.storeImageDto.imageUrl} />
                      ) : (
                        <S.NonePic />
                      )}
                      <p>{item.storeName}</p>
                    </Row>
                  </td>
                  <td>{item.address.fullAddress}</td>
                  <td style={{ textAlign: "center" }}>{item.phone || "-"}</td>
                  <td style={{ textAlign: "center" }}>
                    {item.congestionScoreAvg || "-"}
                  </td>
                  <td>{item.reviewCnt}건</td>
                  <td>{item.regDateTime.split("T")[0]}</td>
                  <td>{item.modDateTime.split("T")[0]}</td>
                  <td>
                    <Memo onClick={() => setModal(true)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </S.TableHeader>
      </S.Wrapper>
      {temp.length === 0 && (
        <None
          text={"카페"}
          text2={"새 카페 등록"}
          href={"/management/register"}
        />
      )}
      {modal && <MemoModal setModal={setModal} />}
    </>
  );
};

export default ManagementCafe;
