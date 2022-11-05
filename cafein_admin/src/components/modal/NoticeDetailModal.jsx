import React, { useEffect, useRef, useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import { ReactComponent as Close } from "../../svg/close2.svg";
import styled from "styled-components";
import * as SS from "../noticesStyle";

import { ReactComponent as Photo } from "../../svg/photo.svg";
import { ReactComponent as CloseIcon } from "../../svg/close.svg";
import PVImg from "../common/PVImg";

import Row from "../atoms/row";
import NoticePreview from "./NoticePreview";
import { editNoticeApi } from "../../util/events";
import { resizeImg } from "../../constant/resizeImg";

export default function NoticeDetailModal({ setModal, selectItem, menu, setAlert }) {
  const closeModal = () => {
    setModal(false);
  };
  const [preview, setPreview] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    ...selectItem,
    deleteImageId: "",
    imageFile: [],
  });
  const [file, setFile] = useState([]);

  const onLoadFile = async (e) => {
    if (file?.length >= 1) {
      window.alert("이미지는 1개만 추가 가능합니다");
      return;
    } else {
      if (e.target.files[0]) {
        const file = await resizeImg(e.target.files[0]);
        setFile([file]);
        const copy2 = { ...data, imageFile: [file] };
        setData(copy2);
      }
    }
  };

  const onChange = (e) => {
    const name = e.target.name;
    const copy = { ...data };
    copy[name] = e.target.value;
    setData(copy);
  };
  const deleteImg = () => {
    setFile([]);
    const copy2 = { ...data };
    copy2.deleteImageId = selectItem.boardImageDtoList[0].imageId;

    setData(copy2);
  };

  const onSubmit = () => {
    if (!edit) {
      setEdit(true);
      window.alert("수정 모드입니다.");
    } else {
      console.log(data);
      editNoticeApi(data)
        .then((res) => {
          console.log(res);
          window.alert("수정되었습니다.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          window.alert("나중에 다시 해주세요");
          window.location.reload();
        });
    }
  };

  useEffect(() => {
    if (selectItem.boardImageDtoList[0]) {
      setFile([selectItem.boardImageDtoList[0].imageUrl]);
    }
  }, []);

  const input = useRef();
  return (
    <>
      <Portal setModal={setModal}>
        <S.ModalBox height="776px">
          <S.ModalHeader>
            <p>{menu == "notice" ? "공지사항 상세" : "자주 묻는 질문 상세"}</p>
            <Close onClick={closeModal} />
          </S.ModalHeader>
          <S.ModalContent height="460px">
            <Columnbox style={{ marginBottom: "16px" }}>
              <Line>
                <span>분류</span>
                <p>{String(selectItem.boardId).padStart(6, "0")}</p>
              </Line>

              <Line>
                <span>등록일</span>
                <p>{String(selectItem.regDateTime).replace("T", " ")}</p>
              </Line>
              <Line>
                <span>제목</span>
                {edit ? (
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectItem.title}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  <p>{selectItem.title}</p>
                )}
              </Line>
            </Columnbox>
            {edit ? (
              <textarea
                type="text"
                name="content"
                defaultValue={selectItem.content}
                onChange={(e) => onChange(e)}
              />
            ) : (
              <Text>{selectItem.content || "-"}</Text>
            )}
          </S.ModalContent>
          <S.ModalFooter style={{ justifyContent: "end", flexDirection: "column" }}>
            {edit ? (
              <SS.PhotoBox style={{ minHeight: "120px", marginBottom: "30px" }}>
                <SS.FileUpload
                  onClick={() => {
                    input.current?.click();
                  }}
                >
                  <Photo />
                  <div>{file?.length || 0}/1</div>
                  <input
                    ref={input}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => onLoadFile(e)}
                  />
                </SS.FileUpload>
                {file[0] && (
                  <SS.ImgBox>
                    <CloseIcon name={file[0]?.name} onClick={deleteImg} />
                    <PVImg img={file[0]} />
                  </SS.ImgBox>
                )}
              </SS.PhotoBox>
            ) : (
              <Row gap={10} style={{ minHeight: "120px", marginBottom: "30px" }}>
                {file[0] && (
                  <Pic>
                    <img src={file[0]} alt="img" />
                  </Pic>
                )}
              </Row>
            )}
            <Row gap={24} align="center" justify="end" style={{ width: "100%" }}>
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
              <S.Btn color="#515151" onClick={onSubmit}>
                수정
              </S.Btn>
              <S.Btn color="#2563eb" onClick={() => setPreview(true)}>
                미리보기
              </S.Btn>
            </Row>
          </S.ModalFooter>
        </S.ModalBox>
      </Portal>
      {preview && (
        <NoticePreview
          item={selectItem}
          setModal={setPreview}
          file={selectItem.reviewImageDtoList}
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
    width: 55px;
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
  & > input {
    border: 0;
    background-color: inherit;
    color: #fff;
    &:focus {
      outline: none;
    }
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
