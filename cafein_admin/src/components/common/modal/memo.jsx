import React, { useEffect, useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import Row from "../../atoms/row";
import { memoDataApi, registerMemoApi } from "../../../util/memo";

export default function MemoModal({ setModal, memoId, selectItem }) {
  const closeModal = () => {
    setModal(false);
  };

  const [memo, setMemo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");
  const txt = window.location.pathname;
  console.log(selectItem);
  console.log(memoId);

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const onsubmit = async () => {
    let id = null;
    if (txt === "/management") id = selectItem.storeId;
    else if (txt === "/review") id = selectItem.reviewId;
    else if (txt === "/user") id = selectItem.memberId;
    registerMemoApi(id, content, txt).then((res) => console.log(res));
  };

  useEffect(() => {
    if (memoId) {
      memoDataApi(memoId).then((res) => console.log(res));
    }
  });
  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <p>
            {txt === "/management"
              ? "카페관리_"
              : txt === "/review"
              ? "리뷰관리_"
              : "회원관리_"}
            {txt === "/management"
              ? memo.storeId || String(selectItem.storeId).padStart(5, "0")
              : txt === "/review"
              ? memo.reviewId || selectItem.reviewId
              : memo.memberId || selectItem.memberId}
          </p>
          <Close onClick={closeModal} />
        </S.ModalHeader>
        {memoId ? (
          <>
            <S.ModalContent>
              {editMode ? <textarea /> : <div>hi</div>}
            </S.ModalContent>
            <S.ModalFooter>
              <p>2시간전</p>
              <Row gap={24}>
                {editMode ? (
                  <>
                    <S.Btn color={"#515151"}>삭제</S.Btn>
                    <S.Btn color={"#2563eb"}>등록</S.Btn>
                  </>
                ) : (
                  <>
                    <S.Btn color={"#515151"}>삭제</S.Btn>
                    <S.Btn color={"#2563eb"}>수정</S.Btn>
                  </>
                )}
              </Row>
            </S.ModalFooter>
          </>
        ) : (
          <>
            <S.ModalContent>
              <textarea
                cols="50"
                rows="20"
                placeholder="내용을 입력하세요"
                name="content"
                onChange={(e) => onChange(e)}
              />
            </S.ModalContent>
            <S.ModalFooter>
              <p>{new Date().toLocaleDateString()}</p>
              <Row gap={24}>
                <S.Btn color={"#2563eb"} onClick={onsubmit}>
                  등록
                </S.Btn>
              </Row>
            </S.ModalFooter>
          </>
        )}
      </S.ModalBox>
    </Portal>
  );
}
