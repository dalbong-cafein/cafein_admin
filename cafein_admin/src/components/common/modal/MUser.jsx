import React, { useEffect, useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import styled from "styled-components";

import { ReactComponent as Close } from "../../../svg/close2.svg";
import { ReactComponent as Page } from "../../../svg/page.svg";

import Row from "../../atoms/row";
import { stickerApi, userLeaveApi, userReportApi } from "../../../util/user";
import MUReport from "./MUReport";
import Sticker from "./sticker";
import RedAlert from "./redAlert";

export default function MUser({ setModal, selectItem }) {
  const closeModal = () => {
    setModal(false);
  };
  const [data, setData] = useState([]);
  const [SItem, setItems] = useState([]);
  const [RModal, setRModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [sticker, setSticker] = useState(false);
  const [sItem, setSItem] = useState([]);
  const [alert, setAlert] = useState(false);

  const stickerView = () => {
    stickerApi(selectItem.memberId)
      .then((res) => {
        setSItem(res.data.data);
        setSticker(true);
      })
      .catch((err) => console.log(err));
  };

  const onDel = () => {
    userLeaveApi(selectItem.memberId)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (selectItem.memberId) {
      userReportApi(selectItem.memberId).then((res) =>
        setData(res.data.data.adminReportResDtoList)
      );
    }
  }, [selectItem]);

  return (
    <>
      <Portal>
        <ModalBox>
          {selectItem && (
            <>
              <ModalBoxs
                style={{ borderRadius: "16px 0 0 16px" }}
                color={"#131313"}
                width={516}
              >
                <Title size={20}>회원 상세</Title>
                <Columnbox gap={14}>
                  <Line>
                    <span>분류</span>
                    <p>{String(selectItem.memberId).padStart(6, "0")}</p>
                  </Line>
                  <Line>
                    <span>소셜</span>
                    <p style={{ color: "#FC7521" }}>
                      {selectItem?.socialTypeList?.length >= 1 &&
                        selectItem?.socialTypeList[0]}
                    </p>
                    {selectItem?.socialTypeList?.length === 2 && (
                      <p style={{ color: "#e3e3e3" }}>
                        {selectItem.socialTypeList[1]}
                      </p>
                    )}
                  </Line>
                  <Line>
                    <span>회원명</span>
                    <p style={{ width: "220px" }}>
                      {selectItem.nickname || "-"}
                    </p>
                    <Row gap={16} align={"center"}>
                      {selectItem.memberImageDto && (
                        <Photo img={selectItem.memberImageDto.imageUrl} />
                      )}
                    </Row>
                  </Line>
                  <Line>
                    <span>핸드폰</span>
                    {!edit ? (
                      <p>{selectItem.phone || "-"}</p>
                    ) : (
                      <input defaultValue={selectItem.phone} />
                    )}
                  </Line>
                  <Line>
                    <span>이메일</span>
                    {!edit ? (
                      <p>{selectItem.email || "-"}</p>
                    ) : (
                      <input defaultValue={selectItem.email} />
                    )}
                  </Line>
                  <Line>
                    <span>생년월일</span>
                    {!edit ? (
                      <p>{selectItem.birth || "-"}</p>
                    ) : (
                      <input defaultValue={selectItem.birth} />
                    )}
                  </Line>
                  <Line>
                    <span>성별</span>
                    {!edit ? (
                      <p>{selectItem.gender || "-"}</p>
                    ) : (
                      <input defaultValue={selectItem.gender} />
                    )}
                  </Line>
                  <Line>
                    <span>APP</span>
                    <p>{selectItem.app || "-"}</p>
                  </Line>
                  <Line>
                    <span>DEVICE IP</span>
                    <p>
                      {selectItem.divice || "-"}
                      <br />
                      {selectItem.ip || "-"}
                    </p>
                  </Line>
                </Columnbox>
              </ModalBoxs>
              <ModalBoxs
                style={{ borderRadius: "0 16px 16px 0", position: "relative" }}
                color={"#333333"}
                width={476}
              >
                <Row justify={"space-between"}>
                  <Title size={16}>활동정보</Title>
                  <Close onClick={closeModal} />
                </Row>
                <Columnbox>
                  <Line color={"#515151"}>
                    <span>방문</span>
                    <p>{"-"}</p>
                  </Line>
                  <Line color={"#515151"}>
                    <span>저장</span>
                    <p>{selectItem?.heartCnt || "-"}</p>
                  </Line>
                  <Line color={"#515151"}>
                    <span>공유</span>
                    <p>{"-"}</p>
                  </Line>
                  <Line color={"#515151"}>
                    <span>혼잡도</span>
                    <p>{selectItem?.congestionCnt || "-"}</p>
                  </Line>
                  <Line color={"#515151"}>
                    <span>리뷰</span>
                    <p>{selectItem?.reviewCnt || "-"}</p>
                  </Line>
                  <Line color={"#515151"}>
                    <span>스티커</span>
                    <p>{selectItem?.stickerCnt || "-"}</p>{" "}
                    <Page onClick={stickerView} />
                  </Line>
                </Columnbox>
                <Title style={{ padding: "40px 0 20px" }} size={16}>
                  기타
                </Title>
                <Columnbox>
                  <Line color={"#515151"}>
                    <span>가입일</span>
                    <p>
                      {String(selectItem.joinDateTime).replace("T", " ") || "-"}
                    </p>
                  </Line>
                  <StateRow>
                    <div>
                      <span>상태</span>
                      <Btn
                        content={
                          selectItem.memberState === "NORMAL"
                            ? "기본"
                            : selectItem.memberState === "SUSPENSION"
                            ? "신고"
                            : "탈퇴"
                        }
                      >
                        {selectItem.memberState === "NORMAL"
                          ? "기본"
                          : selectItem.memberState === "SUSPENSION"
                          ? "신고"
                          : "탈퇴"}
                      </Btn>
                      <p onClick={() => setAlert(true)}>탈퇴</p>
                    </div>
                    <div>
                      {data &&
                        data.map((item, i) => (
                          <div key={i}>
                            {i + 1}.{item.categoryName}{" "}
                            <Page
                              onClick={() => {
                                setRModal(true);
                                setItems(item);
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  </StateRow>
                </Columnbox>
                <BtnRow>
                  {!edit ? (
                    <S.Btn
                      color={"#515151"}
                      onClick={() =>
                        // setEdit(true)
                        window.alert("서비스 준비중입니다.")
                      }
                    >
                      수정
                    </S.Btn>
                  ) : (
                    <S.Btn color={"#2563eb"} onClick={() => setEdit(false)}>
                      저장
                    </S.Btn>
                  )}
                </BtnRow>
              </ModalBoxs>
            </>
          )}
        </ModalBox>
      </Portal>
      {RModal && <MUReport selectItem={SItem} setModal={setRModal} />}
      {sticker && (
        <Sticker
          setModal={setSticker}
          selectItem={sItem}
          id={selectItem.memberId}
        />
      )}

      {alert && (
        <RedAlert
          text={"회원 탈퇴"}
          text2={"'탈퇴'"}
          text3={"로 상태를 변경 하시겠습니까?"}
          setAlert={setAlert}
          func={onDel}
          forFunc={null}
        />
      )}
    </>
  );
}

const ModalBox = styled.div`
  width: 992px;
  height: 780px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #131313;
  box-sizing: border-box;
  border: 1px solid #515151;
  border-radius: 16px;
  display: flex;
`;
const ModalBoxs = styled.div`
  width: ${(props) => props.width && props.width}px;
  height: 778px;
  box-sizing: border-box;
  background-color: ${(props) => props.color && props.color};
  color: #fff;
  padding: 40px;
`;

const Title = styled.p`
  font-size: ${(props) => props.size}px;
  font-weight: 700;
  color: #f6f6f6;
  padding-bottom: 60px;
`;
const Line = styled.div`
  display: flex;

  width: 100%;
  padding: 5px 0 13px;
  border-bottom: 1px solid ${(props) => (props.color ? props.color : "#333333")};
  & > span {
    padding-right: 32px;
    width: 69px;
    text-align: right;
    font-size: 16px;
    font-weight: 700;
    color: #8b8b8b;
  }
  & > p:nth-child(2) {
    color: #e3e3e3;
    padding-right: 10px;
  }
  & > svg {
    cursor: pointer;
  }

  & > input {
    border: 0;
    width: 216px;
    color: #e3e3e3;
    background-color: inherit;
    font-size: 16px;
    font-weight: 400;
    &:focus {
      outline: none;
    }
  }
`;

const StateRow = styled.div`
  // display: flex;

  border-bottom: 1px solid #515151;
  & > div:first-child {
    display: flex;
    gap: 32px;
    align-items: baseline;
    & > span {
      width: 59px;
      text-align: right;
      font-size: 16px;
      font-weight: 700;
      color: #8b8b8b;
    }
    & > p {
      margin-left: 80px;
      font-weight: 700;
      color: #f44336;
      cursor: pointer;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    max-height: 100px;
    padding-bottom: 15px;
    margin-left: 110px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background-color: none;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: gray;
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
    & > div {
      color: #e3e3e3;
      line-height: 24px;
    }
  }
`;
const Columnbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 20px;
`;

const Btn = styled.div`
  background-color: ${(props) =>
    props.content === "기본"
      ? "#18452e"
      : props.content === "신고"
      ? "#56211d"
      : "#5a3b0d"};
  width: 86px;
  height: 26px;
  text-align: center;
  margin: 0 auto;

  border-radius: 6px;
  color: ${(props) =>
    props.content === "기본"
      ? "#20a45c"
      : props.content === "신고"
      ? "#d24035"
      : "#e59116"};
  line-height: 26px;
`;

const Photo = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ img }) => img && `url(${img})`} no-repeat center center/cover;
`;

const BtnRow = styled.div`
  position: absolute;
  display: flex;
  justify-content: right;
  width: 85%;
  top: 700px;
`;
