import React, { useState } from "react";

import Row from "../atoms/row";
import DropBox from "./Dropbox";
import * as S from "../../pages/style copy";

import { ReactComponent as Search } from "../../svg/Search.svg";
import { ReactComponent as ArrowDown } from "../../svg/ArrowDown.svg";
import { ReactComponent as CloseIcon } from "../../svg/close.svg";
import { ReactComponent as Check } from "../../svg/check.svg";

import Paging from "./Pagination";

export default function FilterRow({
  searchType,
  setSearchType,
  searchArr,
  setSearchArr,
  count,
  page,
  item,
  onDesc,
  setPage,
  searchData,
  search,
  setSearch,
  nodrop,
  onResetData,
  sort,
  onAsc,
}) {
  const [isDrop, setIsDrop] = useState(false);
  const onclick = () => {
    onDesc();
    setPage(1);
    searchData();
    setIsDrop(false);
  };
  const handlePageChange = (page) => {
    setPage(page);
  };

  const onEnterKey = (e) => {
    if (e.key === "Enter") {
      onclick();
    }
  };
  return (
    <Row justify="space-between" align="baseline" style={{ marginBottom: "20px" }}>
      <Row gap={15}>
        {nodrop ? (
          <>
            {" "}
            <S.Sbtn onClick={onDesc}>
              최신순
              {sort === "DESC" && <Check />}
            </S.Sbtn>
            <S.Sbtn onClick={onAsc}>오래된 순{sort === "ASC" && <Check />}</S.Sbtn>
          </>
        ) : (
          <>
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
            <Row style={{ borderBottom: "1px solid #fff" }} onKeyDown={onEnterKey}>
              <S.Input placeholder="검색" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
              <Search onClick={onclick} />
            </Row>
            <S.ResetBtn onClick={onResetData}>목록으로 돌아가기</S.ResetBtn>{" "}
          </>
        )}
      </Row>
      <Row gap={15} align="baseline">
        <Paging count={count} handlePageChange={handlePageChange} page={page} item={item} />
      </Row>
    </Row>
  );
}
