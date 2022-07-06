import React, { useState } from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

const Paging = ({ page, count, setPage, handlePageChange }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={9}
      totalItemsCount={count}
      pageRangeDisplayed={4}
      prevPageText={"‹"}
      nextPageText={"›"}
      firstPageText={"«"}
      lastPageText={"»"}
      onChange={handlePageChange}
    />
  );
};
export default Paging;
