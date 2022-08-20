import { useCallback, useState } from "react";

export default function useSearch(initialForm) {
  const [searchType, setSearchType] = useState("전체");
  const [searchArr, setSearchArr] = useState(initialForm);

  return [searchType, setSearchType, searchArr, setSearchArr];
}
