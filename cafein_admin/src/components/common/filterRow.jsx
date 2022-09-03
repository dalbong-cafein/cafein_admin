import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Row from "../atoms/row";
import DropBox from "./dropbox";
import * as S from "../../pages/style copy";

import { ReactComponent as Search } from "../../svg/Search.svg";
import { ReactComponent as ArrowDown } from "../../svg/ArrowDown.svg";
import { ReactComponent as Check } from "../../svg/check.svg";
import Paging from "./Pagination";

export default function FilterRow({
  children,
  searchType,
  setSearchType,
  searchArr,
  setSearchArr,
  sort,
  count,
  page,
  item,
  onDesc,
  onAsc,
  setPage,
  searchData,
  search,
  setSearch,
}) {
  const [isDrop, setIsDrop] = useState(false);
  const navigate = useNavigate();
  const onclick = () => {
    onDesc();
    setPage(1);
    searchData();
  };
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <Row
      justify={"space-between"}
      align={"baseline"}
      style={{ marginBottom: "20px" }}
    >
      <Row gap={15}>
        {children}
        <S.Sbtn onClick={() => onDesc()}>
          최신순
          {sort === "DESC" && <Check />}
        </S.Sbtn>
        <S.Sbtn onClick={() => onAsc()}>
          오래된 순{sort === "ASC" && <Check />}
        </S.Sbtn>
      </Row>
      <Row gap={15} align={"baseline"}>
        <Paging
          count={count}
          handlePageChange={handlePageChange}
          page={page}
          item={item}
        />
        <S.Sbtn onClick={() => setIsDrop(!isDrop)}>
          <p>{searchType}</p>
          <ArrowDown />
          {isDrop && (
            <DropBox
              searchArr={searchArr}
              setIsDrop={setIsDrop}
              setSearchArr={setSearchArr}
              searchType={searchType}
              setSearchType={setSearchType}
            />
          )}
        </S.Sbtn>

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
  );
}
