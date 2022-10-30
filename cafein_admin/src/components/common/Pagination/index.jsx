import React, { useState } from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

const Paging = ({ page, count, setPage, handlePageChange, item }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={item}
      totalItemsCount={count}
      pageRangeDisplayed={4}
      prevPageText="‹"
      nextPageText="›"
      firstPageText="«"
      lastPageText="»"
      onChange={handlePageChange}
    />
  );
};
export default Paging;
