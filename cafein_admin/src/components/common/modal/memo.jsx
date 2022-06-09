import React, { useEffect, useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import Row from "../../atoms/row";
import {
  delMemoApi,
  editMemoApi,
  memoDataApi,
  registerMemoApi,
} from "../../../util/memo";
import RedAlert from "./redAlert";

export default function MemoModal({ setModal, memoId, selectItem }) {
  const closeModal = () => {
    setModal(false);
  };

  const [memo, setMemo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState(false);
  const [content, setContent] = useState("");
  const txt = window.location.pathname;

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const onsubmit = async () => {
    let id = null;
    if (txt === "/management") id = selectItem.storeId;
    else if (txt === "/review") id = selectItem.reviewId;
    else if (txt === "/user") id = selectItem.memberId;
    //쿠폰이면
    registerMemoApi(id, content, txt).then((res) => {
      alert("등록되었습니다");
      setModal(false);
    });
  };

  const onEdit = () => {
    editMemoApi(memoId, content)
      .then((res) => setEditMode(false))
      .catch((err) => console.log(err));
  };
  const onDel = () => {
    delMemoApi(memoId)
      .then((res) => {
        setModal(false);
        setAlert(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  function getTime() {
    const today = new Date();
    const timeValue = new Date(memo?.modDateTime || memo?.regDateTime);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  useEffect(() => {
    if (memoId) {
      memoDataApi(memoId).then((res) => setMemo(res.data.data));
    }
  }, []);

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
              ? memo.storeId || selectItem.storeId
              : txt === "/review"
              ? memo.reviewId || selectItem.reviewId
              : memo.memberId || selectItem.memberId}
          </p>
          <Close onClick={closeModal} />
        </S.ModalHeader>
        {memoId ? (
          <>
            <S.ModalContent>
              {editMode ? (
                <textarea
                  cols="50"
                  rows="20"
                  placeholder="내용을 입력하세요"
                  name="content"
                  defaultValue={memo?.content}
                  onChange={(e) => onChange(e)}
                />
              ) : (
                <div>{memo?.content}</div>
              )}
            </S.ModalContent>
            <S.ModalFooter>
              <p>{getTime()}</p>
              <Row gap={24}>
                {editMode ? (
                  <>
                    <S.Btn color={"#515151"} onClick={() => setEditMode(false)}>
                      취소
                    </S.Btn>
                    <S.Btn color={"#2563eb"} onClick={onEdit}>
                      등록
                    </S.Btn>
                  </>
                ) : (
                  <>
                    <S.Btn
                      style={{ border: "1px solid #515151" }}
                      onClick={() => setAlert(true)}
                    >
                      삭제
                    </S.Btn>
                    <S.Btn
                      color={"#515151"}
                      onClick={() => setEditMode(!editMode)}
                    >
                      수정
                    </S.Btn>
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
        {alert && (
          <RedAlert
            text={"메모 삭제"}
            text1={"메모를"}
            text2={"삭제"}
            text3={"하시겠습니까?"}
            setAlert={setAlert}
            func={onDel}
            forFunc={null}
          />
        )}
      </S.ModalBox>
    </Portal>
  );
}
