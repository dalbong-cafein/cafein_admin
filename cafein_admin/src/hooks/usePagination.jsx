import { useCallback, useState } from "react";

function usePagination(initialForm) {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState("DESC");
  const [item, setItem] = useState(initialForm || 9);
  const onDesc = useCallback(() => setSort("DESC"), []);
  const onAsc = useCallback(() => setSort("ASC"), []);

  return [page, sort, item, count, setCount, setPage, onDesc, onAsc];
}

export default usePagination;
