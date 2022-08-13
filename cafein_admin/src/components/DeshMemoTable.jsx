import React, { useState, useEffect } from "react";
import useTnF from "../hooks/useTnF";
import styled from "styled-components";

import NoneDiv from "./common/Nonediv";
import DeshMemo from "./DeshMemoTable.sx";

import { memoListApi } from "../util/memo";
import MemoModal from "./common/modal/memo";

export default function MemoTable() {
  //메모 관련 state
  const [memoModal, onMemoModalOn, onMemoModalOff] = useTnF(false);
  const [memoArr, setMemoArr] = useState([]);
  const [memoId, setMemoId] = useState(null);
  const [selectMItem, setselectMItem] = useState([]);
  const memoClick = (item) => {
    setMemoId(item.memoId);
    setselectMItem(item);
    onMemoModalOn();
  };

  useEffect(() => {
    memoListApi().then((res) => setMemoArr(res.data.data));
  }, []);

  return (
    <>
      <Box>
        <p>메모</p>
        {memoArr?.length === 0 ? (
          <NoneDiv padding={284} text={"메모"} />
        ) : (
          <>
            {memoArr?.map((item, i) => (
              <DeshMemo
                key={i}
                item={item}
                memoClick={memoClick}
                setselectMItem={setselectMItem}
              />
            ))}
          </>
        )}
      </Box>
      {memoModal && (
        <MemoModal
          memoId={memoId}
          setModal={onMemoModalOff}
          selectItem={selectMItem}
        />
      )}
    </>
  );
}

const Box = styled.div`
  flex: 1;
  box-sizing: border-box;
  height: 100%;
  width: 25%;
  background-color: #222222;
  border-radius: 16px;
  padding: 24px;
  & > p:first-child {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }

  // overflow-y: scroll;
  // ::-webkit-scrollbar {
  //   width: 6px;
  // }
  // ::-webkit-scrollbar-track {
  //   background-color: none;
  // }
  // ::-webkit-scrollbar-thumb {
  //   border-radius: 3px;
  //   background-color: gray;
  // }
  // ::-webkit-scrollbar-button {
  //   width: 0;
  //   height: 0;
  // }
`;
