import React, { useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import styled from "styled-components";
import { ReactComponent as Close } from "../../svg/close2.svg";
import Row from "../atoms/row";
import { useEffect } from "react";
import {
  reviewDelApi,
  reviewDetailApi,
  reviewUserDataApi,
} from "../../util/review";
import RedAlert from "./RedAlert";
import ReportReason from "./ReportReason";
import Sliders from "../common/carousel/carousel";
import Stars from "../atoms/stars";

export default function ReviewView({ setModal, id, loadD }) {
  const [temp, setTemp] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [del, setDel] = useState(false);
  const [rReason, setRReason] = useState(false);
  const [slider, setSlider] = useState(false);
  const [isSelect, setIsSelect] = useState(null);

  const [detail, setDetail] = useState(false);
  const closeModal = () => {
    setModal(false);
    loadD(id);
  };

  const loadData = (userId) => {
    reviewUserDataApi(userId)
      .then((res) => {
        setTemp(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const reviewDel = (ids) => {
    reviewDelApi(ids)
      .then((res) => {
        alert("삭제 완료!");
        loadData(id);
      })
      .catch((err) => alert("잠시후에 다시 시도해주세요"));
  };
  const onViewDetail = (item, i) => {
    setIsSelect(() => i);
    reviewDetailApi(item.reviewId)
      .then((res) => {
        setDetailData(res.data.data);
        setDetail(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData(id);
  }, []);

  return (
    <>
      <Portal setModal={setModal}>
        <S.ModalBigBox double={detail}>
          <Row>
            <div
              style={{
                width: detail ? "50%" : "100%",
                padding: "40px",
                boxSizing: "border-box",
              }}
            >
              <S.ViewHeader>
                <div>
                  <p>리뷰 내역</p>
                  <p>회원번호</p>
                  <p>{String(id).padStart(6, "0")}</p>
                </div>
                <Close onClick={closeModal} />
              </S.ViewHeader>
              <S.ModalContent>
                {temp &&
                  temp.map((item, i) => (
                    <IRow key={i} color={i == isSelect}>
                      <p>{i + 1}</p>
                      <p onClick={() => onViewDetail(item, i)}>
                        {item.storeName}
                      </p>
                      <p onClick={() => onViewDetail(item, i)}>
                        {String(item.reviewId).padStart(6, "0")}
                      </p>
                      <p onClick={() => onViewDetail(item, i)}>
                        {String(item.regDateTime).split("T")[0]}
                      </p>
                      <p onClick={() => reviewDel(item.reviewId)}>삭제</p>
                    </IRow>
                  ))}
              </S.ModalContent>
            </div>
            {detail && (
              <div
                style={{
                  width: "50%",
                  padding: "40px",
                  boxSizing: "border-box",
                  background: "#333333",
                  borderRadius: "0 16px 16px 0",
                }}
              >
                <S.ModalHeader>
                  <p>리뷰 상세</p>
                  <Close onClick={() => setDetail(false)} />
                </S.ModalHeader>
                <S.ModalContent>
                  <Columnbox>
                    <Line>
                      <span>분류</span>
                      <p>{String(detailData.reviewId).padStart(6, "0")}</p>
                    </Line>
                    <Line>
                      <span>회원 정보</span>
                      <p>{String(detailData.writerId).padStart(6, "0")}</p>
                      <p>{detailData.nicknameOfWriter || "-"}</p>
                      <p>{`방문 ${detailData?.visitCnt}번째`}</p>
                    </Line>
                    <Line>
                      <span>카페 정보</span>
                      <p>{String(detailData.storeId).padStart(6, "0")}</p>
                      <p>{detailData.storeName}</p>
                    </Line>
                    <Line>
                      <span>등록일</span>
                      <p>{String(detailData.regDateTime).replace("T", " ")}</p>
                    </Line>
                    <Line>
                      <span>최종수정일</span>
                      <p>{String(detailData.modDateTime).replace("T", " ")}</p>
                    </Line>
                  </Columnbox>
                  <RecommendBox>
                    <p>
                      {detailData.recommendation === "GOOD"
                        ? "추천해요"
                        : detailData.recommendation === "NORMAL"
                        ? "그저그래요"
                        : "별로예요"}
                    </p>
                  </RecommendBox>
                  <Row
                    gap={16}
                    align="baseline"
                    style={{ margin: "10px 0 0", fontSize: "14px" }}
                  >
                    <Row gap={8} align="baseline" style={{ width: "120px" }}>
                      와이파이
                      <Stars
                        width={11}
                        gap={2}
                        num={detailData.detailEvaluation.wifi}
                        color="#FD9759"
                      />
                    </Row>
                    <Row gap={8} align="baseline">
                      콘센트
                      <Stars
                        color="#FD9759"
                        width={11}
                        gap={2}
                        num={detailData.detailEvaluation.socket}
                      />
                    </Row>
                  </Row>
                  <Row gap={16} align="baseline" style={{ fontSize: "14px" }}>
                    <Row gap={8} align="baseline" style={{ width: "120px" }}>
                      화장실
                      <Stars
                        color="#FD9759"
                        width={11}
                        gap={2}
                        num={detailData.detailEvaluation.restroom}
                      />
                    </Row>
                    <Row gap={8} align="baseline">
                      테이블
                      <Stars
                        color="#FD9759"
                        width={11}
                        gap={2}
                        num={detailData.detailEvaluation.tableSize}
                      />
                    </Row>
                  </Row>
                  <Text>{detailData.content || "-"}</Text>

                  {detailData.reviewImageDtoList && (
                    <Row gap={10}>
                      {detailData.reviewImageDtoList.map((item, i) => (
                        <Pic key={i} onClick={() => setSlider(true)}>
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
                  <Row gap={24}>
                    <S.Btn color="#515151" onClick={() => setRReason(true)}>
                      신고
                    </S.Btn>
                    <S.Btn color="#2563eb" onClick={() => setDel(true)}>
                      삭제
                    </S.Btn>
                  </Row>
                </S.ModalFooter>
              </div>
            )}
          </Row>
        </S.ModalBigBox>
      </Portal>
      {del && (
        <RedAlert
          text="리뷰 삭제"
          text1="리뷰를"
          text2=" 삭제"
          text3="하시겠습니까?"
          setAlert={setDel}
          func={reviewDel}
          forFunc={detailData.reviewId}
        />
      )}
      {rReason && (
        <ReportReason setModal={setRReason} id={detailData.reviewId} />
      )}
      {slider && (
        <Sliders setModal={setSlider} imgs={detailData?.reviewImageDtoList} />
      )}
    </>
  );
}

const IRow = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
  font-size: 14px;

  & > p:first-child {
    width: 20px;
    text-align: left;
    color: ${(props) => (props.color ? "#FC7521" : "#8b8b8b")};
    font-weight: 500;
  }
  & > p:nth-child(2) {
    width: 250px;
    color: ${(props) => (props.color ? "#FC7521" : "#8b8b8b")};
    cursor: pointer;
  }
  & > p:nth-child(3) {
    width: 100px;
    color: ${(props) => (props.color ? "#FC7521" : "#8b8b8b")};
    cursor: pointer;
  }
  & > p:nth-child(4) {
    width: 100px;
    color: ${(props) => (props.color ? "#FC7521" : "#8b8b8b")};
    cursor: pointer;
  }
  & > p:last-child {
    color: #ff5c50;
    cursor: pointer;
  }
`;
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
  border-bottom: 1px solid ${(props) => (props.color ? props.color : "#515151")};
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
  height: 50px;
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

const RecommendBox = styled.div`
  margin-top: 32px;
  max-width: 63px;
  height: 22px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  background-color: #fff0e6;
  padding: 4px 8px;
  & > p {
    color: #fc6406;
  }
`;
