import React, { useEffect, useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import styled from "styled-components";

import { ReactComponent as Close } from "../../svg/close2.svg";
import { ReactComponent as Page } from "../../svg/page.svg";

import Row from "../atoms/row";
import { userDataUpdateApi, userLeaveApi, userReportApi } from "../../util/user";
import MUReport from "./MUReport";
import StickerView from "./StickerView";
import RedAlert from "./RedAlert";
import { useNavigate } from "react-router-dom";
import ReviewView from "./reviewView";
import HeartView from "./heartView";

export default function UserDetailModal({ setModal, selectItem, loadD }) {
  const closeModal = () => {
    setModal(false);
  };
  const navigate = useNavigate();
  const [reportData, setReportData] = useState([]);
  const [SItem, setItems] = useState([]);
  const [RModal, setRModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [sticker, setSticker] = useState(false);
  const [review, setReview] = useState(false);
  const [heart, setHeart] = useState(false);
  const [alert, setAlert] = useState(false);
  const [eUData, setEUData] = useState({});

  const reviewView = () => {
    navigate("/review", { state: selectItem.memberId });
  };
  const heartView = () => {
    setHeart(true);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const copy = { ...eUData };
    copy[name] = e.target.value;
    setEUData(copy);
  };

  const onDel = () => {
    userLeaveApi(selectItem.memberId)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  const updateUserData = () => {
    userDataUpdateApi(eUData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        window.alert("나중에 다시 시도해주세요");
        setEdit(false);
      });
  };

  const editData = () => {
    setEdit(true);
  };

  console.log(selectItem);
  useEffect(() => {
    if (selectItem.memberId) {
      userReportApi(selectItem.memberId)
        .then((res) => {
          setReportData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
    setEUData({
      memberId: selectItem.memberId,
      phone: selectItem.phone,
      genderType: selectItem.gender,
      birth: selectItem.birth,
    });
  }, [selectItem]);
  return (
    <>
      <Portal setModal={setModal}>
        <ModalBox>
          {selectItem && (
            <>
              <ModalBoxs style={{ borderRadius: "16px 0 0 16px" }} color="#131313" width={516}>
                <Title size={20}>회원 상세</Title>
                <Columnbox gap={14}>
                  <Line>
                    <span>분류</span>
                    <p>{String(selectItem.memberId).padStart(6, "0")}</p>
                  </Line>
                  <Line>
                    <span>소셜</span>
                    <p>
                      {selectItem?.socialTypeList?.length >= 1 && selectItem?.socialTypeList[0]}
                    </p>
                    {selectItem?.socialTypeList?.length === 2 && (
                      <p style={{ color: "#e3e3e3" }}>{selectItem.socialTypeList[1]}</p>
                    )}
                  </Line>
                  <Line align>
                    <span>닉네임</span>
                    <p style={{ width: "220px" }}>{selectItem.nickname || "-"}</p>
                    {selectItem.memberImageDto && (
                      <Photo img={selectItem.memberImageDto.imageUrl} />
                    )}
                  </Line>
                  <Line align>
                    <span>이름</span>
                    <p style={{ width: "220px" }}>{selectItem.username || "-"}</p>
                  </Line>
                  <Line>
                    <span>핸드폰</span>
                    {!edit ? (
                      <p>{selectItem.phone || "-"}</p>
                    ) : (
                      <input
                        name="phone"
                        defaultValue={selectItem.phone}
                        onChange={(e) => onChange(e)}
                      />
                    )}
                  </Line>
                  <Line>
                    <span>이메일</span>
                    <p>{selectItem.email || "-"}</p>
                  </Line>
                  <Line>
                    <span>생년월일</span>
                    {!edit ? (
                      <p>{selectItem.birth || "-"}</p>
                    ) : (
                      <input
                        name="birth"
                        defaultValue={selectItem.birth}
                        onChange={(e) => onChange(e)}
                      />
                    )}
                  </Line>
                  <Line>
                    <span>성별</span>
                    {!edit ? (
                      <p>{selectItem.gender || "-"}</p>
                    ) : (
                      <input
                        name="genderType"
                        defaultValue={selectItem.gender}
                        onChange={(e) => onChange(e)}
                      />
                    )}
                  </Line>
                  <Line>
                    <span>APP</span>
                    <p>{selectItem.app || "-"}</p>
                  </Line>
                  <Line>
                    <span>DEVICE</span>
                    <p>{selectItem.device || "-"}</p>
                  </Line>
                  <Line>
                    <span>IP</span>
                    <p>{selectItem.ip || "-"}</p>
                  </Line>
                </Columnbox>
              </ModalBoxs>
              <ModalBoxs
                style={{ borderRadius: "0 16px 16px 0", position: "relative" }}
                color="#333333"
                width={476}
              >
                <Row justify="space-between">
                  <Title size={16}>활동정보</Title>
                  <Close onClick={closeModal} />
                </Row>
                <Columnbox>
                  <Line color="#515151" spanWidth={55}>
                    <span>방문</span>
                    <p>-</p>
                  </Line>
                  <Line color="#515151" spanWidth={55}>
                    <span>저장</span>
                    <p>{selectItem?.heartCnt || "-"}</p>
                    <Page onClick={heartView} />
                  </Line>
                  <Line color="#515151" spanWidth={55}>
                    <span>공유</span>
                    <p>-</p>
                  </Line>
                  <Line color="#515151" spanWidth={55}>
                    <span>혼잡도</span>
                    <p>{selectItem?.congestionCnt || "-"}</p>
                  </Line>
                  <Line color="#515151" spanWidth={55}>
                    <span>리뷰</span>
                    <p>{selectItem?.reviewCnt || "-"}</p>
                    <Page onClick={reviewView} />
                  </Line>
                  <Line color="#515151" spanWidth={55}>
                    <span>스티커</span>
                    <p>{selectItem?.stickerCnt || "-"}</p>
                    <Page onClick={() => setSticker(true)} />
                  </Line>
                </Columnbox>
                <Title style={{ padding: "40px 0 20px" }} size={16}>
                  기타
                </Title>
                <Columnbox>
                  <Line color="#515151" spanWidth={55}>
                    <span>가입일</span>
                    <p>{String(selectItem.joinDateTime).replace("T", " ") || "-"}</p>
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
                        <div />
                        {selectItem.memberState === "NORMAL"
                          ? "기본"
                          : selectItem.memberState === "SUSPENSION"
                          ? "신고"
                          : "탈퇴"}
                      </Btn>
                      {selectItem.memberState == "LEAVE" ? (
                        <p style={{ color: "#FF9800" }}>
                          {String(selectItem.leaveDateTime).split("T").join(" ")}
                        </p>
                      ) : (
                        <p
                          style={{ color: "#f44336", marginLeft: "60px" }}
                          onClick={() => setAlert(true)}
                        >
                          탈퇴하기
                        </p>
                      )}
                    </div>
                    <div>
                      {reportData &&
                        reportData.map((item, i) => (
                          <div key={i}>
                            {`${i + 1}. ${item.categoryName}`}
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
                    <S.Btn color="#515151" onClick={() => editData()}>
                      수정
                    </S.Btn>
                  ) : (
                    <S.Btn color="#2563eb" onClick={() => updateUserData()}>
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
      {sticker && <StickerView setModal={setSticker} id={selectItem.memberId} loadD={loadD} />}
      {review && <ReviewView setModal={setReview} id={selectItem.memberId} loadD={loadD} />}
      {heart && <HeartView setModal={setHeart} id={selectItem.memberId} />}

      {alert && (
        <RedAlert
          text="회원 탈퇴"
          text2="'탈퇴'"
          text3="로 상태를 변경 하시겠습니까?"
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
  align-items: ${(props) => (props.align ? "flex-start" : "center")};
  width: 100%;
  padding: 2px 0 13px;
  border-bottom: 1px solid ${(props) => (props.color ? props.color : "#333333")};
  & > span {
    padding-right: 20px;
    width: ${(props) => (props.spanWidth ? props.spanWidth : "69")}px;
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
    gap: 16px;
    align-items: baseline;
    & > span {
      width: 55px;
      text-align: right;
      font-size: 16px;
      font-weight: 700;
      color: #8b8b8b;
    }
    & > p {
      font-weight: 600;
      cursor: pointer;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    max-height: 100px;
    gap: 3px;
    padding-bottom: 15px;
    margin-left: 80px;
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
      display: flex;
      font-size: 14px;
      align-items: center;
      color: #e3e3e3;
      gap: 10px;
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
  position: relative;
  width: 86px;
  height: 26px;
  text-align: center;
  margin: 0 8px;
  border-radius: 6px;
  color: ${(props) =>
    props.content === "기본" ? "#26BA6A" : props.content === "신고" ? "#f44336" : "#ff9800"};
  line-height: 26px;
  & > div:first-child {
    position: absolute;
    width: 86px;
    height: 26px;
    background-color: ${(props) =>
      props.content === "기본" ? "#26BA6A" : props.content === "신고" ? "#f44336" : "#ff9800"};
    opacity: 0.3;
    border-radius: 4px;
  }
`;

const Photo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: ${({ img }) => img && `url(${img})`} no-repeat center center/cover;
`;

const BtnRow = styled.div`
  position: absolute;
  display: flex;
  justify-content: right;
  width: 85%;
  top: 700px;
`;
