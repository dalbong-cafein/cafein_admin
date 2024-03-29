import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Portal from "./Portal";
import * as S from "./style";

import Row from "../atoms/row";
import Sliders from "../common/carousel/carousel";
import RedAlert from "./RedAlert";
import ReportReason from "./ReportReason";
import ReviewStarRow from "../common/ReviewStarRow";
import ReviewRecommendationBtn from "../ReviewRecommendationBtn";

import {
  changePostStatusApi,
  isAbleReportApi,
  reviewDelApi,
  reviewDetailApi,
} from "../../util/review";

import { ReactComponent as Close } from "../../svg/close2.svg";

export default function ReviewDetailModal({ setModal, detailReviewId }) {
  const closeModal = () => {
    setModal(false);
  };
  const [data, setData] = useState([]);
  const [del, setDel] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rReason, setRReason] = useState(false);
  const [changeStatusAlert, setChangeStatusAlert] = useState(false);
  const [slider, setSlider] = useState(false);
  const [isAbleReport, setIsAbleReport] = useState(null);

  const onDel = () => {
    reviewDelApi(detailReviewId)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const changeState = () => {
    changePostStatusApi(data?.reviewId, data?.isPost).then((res) => {
      console.log(res);
      loadData();
      setChangeStatusAlert(false);
    });
  };

  const loadData = () => {
    reviewDetailApi(detailReviewId)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const loadIsAbleReportData = () => {
    isAbleReportApi(detailReviewId).then((res) => {
      console.log(res?.data?.data);
      setIsAbleReport(res?.data?.data);
    });
  };

  useEffect(() => {
    loadData();
    loadIsAbleReportData();
  }, []);

  return (
    <>
      <Portal setModal={setModal}>
        <S.ModalBox height="790px">
          <S.ModalHeader style={{ marginBottom: "30px" }}>
            <p>리뷰 상세</p>
            <Close onClick={closeModal} />
          </S.ModalHeader>
          <S.ModalContent height="620px">
            <Columnbox>
              <S.Line>
                <span>분류</span>
                <p>{String(data.reviewId).padStart(6, "0")}</p>
              </S.Line>
              <S.Line>
                <span>회원 정보</span>
                <p>{String(data.writerId).padStart(6, "0")}</p>
                <p>{data.nicknameOfWriter || "-"}</p>
                <p>{`방문 ${data?.visitCnt}번째`}</p>
              </S.Line>
              <S.Line>
                <span>카페 정보</span>
                <p>{String(data.storeId).padStart(6, "0")}</p>
                <p>{data.storeName}</p>
              </S.Line>
              <S.Line>
                <span>등록일</span>
                <p>{String(data.regDateTime).replace("T", " ")}</p>
              </S.Line>
              <S.Line>
                <span>최종수정일</span>
                <p>{String(data.modDateTime).replace("T", " ")}</p>
              </S.Line>
              <S.Line>
                <span>리뷰상태</span>
                <Btn content={data.isPost} onClick={() => setChangeStatusAlert(true)}>
                  <div />
                  {data?.isPost ? "게시중" : "게시중단"}
                </Btn>
                {!data?.isPost && (
                  <p style={{ color: data?.isPost ? "#26BA6A" : "#f44336" }}>
                    {String(data?.modDateTime).replace("T", " ")}
                  </p>
                )}
              </S.Line>
            </Columnbox>
            <ReviewRecommendationBtn isDetail recommendation={data.recommendation} />
            <Row gap={16} align="baseline" style={{ margin: "10px 0 0", fontSize: "14px" }}>
              <ReviewStarRow
                item1Title="와이파이"
                item2Title="콘센트"
                width="120px"
                item1Star={data?.detailEvaluation?.wifi}
                item2Star={data?.detailEvaluation?.socket}
              />
            </Row>
            <Row gap={16} align="baseline" style={{ fontSize: "14px" }}>
              <ReviewStarRow
                item1Title="화장실"
                item2Title="테이블"
                width="120px"
                item1Star={data?.detailEvaluation?.restroom}
                item2Star={data?.detailEvaluation?.tableSize}
              />
            </Row>
            <Text>{data.content || "-"}</Text>
            {data.reviewImageDtoList && (
              <Row gap={9}>
                {data.reviewImageDtoList.map((item, i) => (
                  <Pic key={i} onClick={() => setSlider(true)}>
                    <img src={process.env.PUBLIC_URL + item.imageUrl} alt="img" />
                  </Pic>
                ))}
              </Row>
            )}
          </S.ModalContent>
          <S.ModalFooter style={{ justifyContent: "end" }}>
            <Row gap={24}>
              <S.Btn onClick={() => setDel(true)}>삭제</S.Btn>

              {isAbleReport?.isPossibleRegistration && (
                <S.Btn color="#515151" onClick={() => setRReason(true)}>
                  신고
                </S.Btn>
              )}
              {/* <S.Btn
                color="#2563eb"
                onClick={() => {
                  if (!isEdit) {
                    setIsEdit(true);
                  }
                }}
              >
                {isEdit ? "저장" : "수정"}
              </S.Btn> */}
            </Row>
          </S.ModalFooter>
        </S.ModalBox>
      </Portal>

      {del && (
        <RedAlert
          text="리뷰 삭제"
          text1="리뷰를"
          text2=" 삭제"
          text3="하시겠습니까?"
          setAlert={setDel}
          func={onDel}
          forFunc={data.reviewId}
        />
      )}
      {rReason && <ReportReason setModal={setRReason} id={data.reviewId} />}
      {slider && <Sliders setModal={setSlider} imgs={data?.reviewImageDtoList} />}
      {changeStatusAlert && (
        <RedAlert
          text="리뷰 삭제"
          text1="리뷰를 "
          text2={`${data?.isPost ? "게시 중단" : "게시"}`}
          text3="하시겠습니까?"
          setAlert={setChangeStatusAlert}
          func={changeState}
          forFunc={null}
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

const Btn = styled.div`
  position: relative;
  width: 86px;
  height: 26px;
  text-align: center;
  border-radius: 6px;
  color: ${(props) => (props.content ? "#26BA6A" : "#f44336")};
  line-height: 26px;
  & > div:first-child {
    position: absolute;
    width: 86px;
    height: 26px;
    background-color: ${(props) => (props.content ? "#26BA6A" : "#f44336")};
    opacity: 0.3;
    border-radius: 4px;
  }
`;
