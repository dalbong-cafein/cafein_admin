import React, { useEffect, useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import styled from "styled-components";

import RedAlert from "./redAlert";
import ReportReason from "./ReportReason";
import Row from "../../atoms/row";
import Preview from "./preview";

export default function NoticeM({ setModal, selectItem2, menu, setAlert }) {
  const closeModal = () => {
    setModal(false);
  };
  const [preview, setPreview] = useState(false);

  const onDel = () => {};

  return (
    <>
      <Portal>
        <S.ModalBox height={"776px"}>
          <S.ModalHeader>
            <p>{menu == "notice" ? "공지사항 상세" : "자주 묻는 질문 상세"}</p>
            <Close onClick={closeModal} />
          </S.ModalHeader>
          <S.ModalContent height={"602px"}>
            <Columnbox style={{ marginBottom: "16px" }}>
              <Line>
                <span>분류</span>
                <p>{String(selectItem2.boardId).padStart(6, "0")}</p>
              </Line>

              <Line>
                <span>등록일</span>
                <p>{String(selectItem2.regDateTime).replace("T", " ")}</p>
              </Line>
              <Line>
                <span>제목</span>
                <p>{selectItem2.title}</p>
              </Line>
            </Columnbox>

            <Text>{selectItem2.content || "-"}</Text>

            {selectItem2.reviewImageDtoList && (
              <Row gap={10}>
                {selectItem2.reviewImageDtoList.map((item, i) => (
                  <Pic key={i}>
                    <img
                      src={process.env.PUBLIC_URL + item.imageUrl}
                      alt="img"
                    />
                  </Pic>
                ))}
              </Row>
            )}
          </S.ModalContent>
          <S.ModalFooter style={{ justifyContent: "end" }}>
            <Row gap={24} align="center">
              <p
                style={{
                  color: "#FF5C50",
                  marginRight: "24px ",
                  cursor: "pointer",
                }}
                onClick={() => setAlert(true)}
              >
                삭제
              </p>
              <S.Btn color={"#515151"}>수정</S.Btn>
              <S.Btn color={"#2563eb"} onClick={() => setPreview(true)}>
                미리보기
              </S.Btn>
            </Row>
          </S.ModalFooter>
        </S.ModalBox>
      </Portal>
      {preview && (
        <Preview
          item={selectItem2}
          setModal={setPreview}
          file={selectItem2.reviewImageDtoList}
          menu={menu}
        />
      )}
    </>
  );
}
const Columnbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Line = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  padding-bottom: 13px;
  border-bottom: 1px solid ${(props) => (props.color ? props.color : "#333333")};
  & > span {
    width: 100px;
    text-align: right;
    font-size: 16px;
    font-weight: 700;
    color: #8b8b8b;
  }
  & > p:nth-child(2) {
    color: #e3e3e3;
  }
  & > p:nth-child(3) {
    color: #fc7521;
  }
  & > p:nth-child(4) {
    color: #acacac;
  }
`;

const Text = styled.div`
  padding: 24px 0;
  white-space: pre-line;
  line-height: 20px;
`;

const Pic = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 6px;
  background-color: #c4c4c4;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
`;
