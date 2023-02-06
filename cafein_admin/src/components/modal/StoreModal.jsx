import React, { useState, useEffect } from "react";
import Portal from "./Portal";
import * as S from "./style";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Close } from "../../svg/close2.svg";
import { ReactComponent as Page } from "../../svg/page.svg";
import { ReactComponent as Star } from "../../svg/Star.svg";

import Row from "../atoms/row";
import HoverContent from "../HoverContent";
import Sliders from "../common/carousel/carousel";
import RedAlert from "./RedAlert";
import CongestionModal from "./CongestionModal";
import { cafeDelApi, feedDetailApi, feedDetailReviewApi } from "../../util/management";

export default function CafeDetailModal({ setDModal, id, congestionScore }) {
  const closeModal = () => {
    setDModal(false);
  };

  const [data, setData] = useState([]);
  const [imgList, setImgList] = useState(null);
  const [congestionVisible, setCongestionVisible] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [slider, setSlider] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const totalfunc = (title) => {
    if (title) {
      const values = Object.values(title);
      let max = 0;
      let maxTitle = null;
      for (let i = 0; i < values.length; i++) {
        if (values[i] >= max) {
          max = values[i];
          maxTitle = i + 1;
        }
      }
      return max == 0 ? "-" : maxTitle;
    }
  };

  const onDel = () => {
    cafeDelApi(data.storeId).then((res) => {
      setAlert(false);
      window.location.reload();
    });
  };

  const loadData = () => {
    feedDetailApi(id)
      .then((res) => {
        setData(res.data.data);
        feedDetailReviewApi(res.data.data.storeId).then((res) => {
          setReviewData(res.data.data);
        });

        setImgList([...res?.data?.data?.storeImageDtoList, ...res?.data?.data?.reviewImageDtoList]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const dayArr = [
    { key: "onMon", name: "월" },
    { key: "onTue", name: "화" },
    { key: "onWed", name: "수" },
    { key: "onThu", name: "목" },
    { key: "onFri", name: "금" },
    { key: "onSat", name: "토" },
    { key: "onSun", name: "일" },
  ];

  const isAllday = () => {
    if (data) {
      const keys = Object.keys(data?.totalBusinessHoursResDto).filter((item) => item !== "etcTime");

      for (let i = 0; i < dayArr.length; i++) {
        if (keys.includes(dayArr[i].key)) {
          if (!data?.totalBusinessHoursResDto[dayArr[i].key]) {
            return false;
          } else if (data?.totalBusinessHoursResDto[dayArr[i].key]?.open) {
            return false;
          } else if (data?.totalBusinessHoursResDto[dayArr[i].key]?.closed) {
            return false;
          }
        } else {
          return false;
        }

        return true;
      }
    }
  };
  return (
    <>
      <Portal setModal={setDModal}>
        {data && reviewData && (
          <ModalBox>
            <ModalBoxs style={{ borderRadius: "16px 0 0 16px" }} color="#131313" width={516}>
              <Title size={20}>카페 상세</Title>
              <Columnbox gap={14}>
                <S.Line>
                  <span>분류</span>
                  <p>{String(data?.storeId).padStart(6, "0")}</p>
                </S.Line>
                <S.Line>
                  <span>회원 번호</span>
                  <p>{String(data?.modMemberId).padStart(6, "0")}</p>
                </S.Line>
                <S.Line>
                  <span>카페명</span>
                  <p>{data?.storeName}</p>
                </S.Line>
                <S.Line>
                  <span>등록일</span>
                  <p>{`${String(data?.regDateTime).replace("T", " ")}`}</p>
                </S.Line>
                <S.Line>
                  <span>최종수정일</span>
                  <p>{`${String(data?.modDateTime).replace("T", " ")}`}</p>
                </S.Line>

                <Title style={{ padding: "20px" }} size={16}>
                  기본 정보
                </Title>
                <Columnbox>
                  <StateRow>
                    <div>
                      <Row justify="center" gap={8} style={{ padding: "0 auto" }}>
                        {data?.presentImageDto && (
                          <StarBox>
                            <Photo
                              img={data?.presentImageDto?.imageUrl}
                              onClick={() => setSlider(true)}
                            />
                            <Star />
                          </StarBox>
                        )}
                        {imgList && imgList?.length > 3 ? (
                          <>
                            {imgList.slice(0, 3).map((item, i) => (
                              <Photo key={i} img={item.imageUrl} onClick={() => setSlider(true)} />
                            ))}
                            <PhotoPlus onClick={() => setSlider(true)}>
                              +{imgList?.length - 4}
                            </PhotoPlus>
                          </>
                        ) : (
                          <>
                            {imgList?.map((item, i) => (
                              <Photo key={i} img={item.imageUrl} onClick={() => setSlider(true)} />
                            ))}
                          </>
                        )}
                      </Row>
                    </div>
                  </StateRow>
                  <S.Line color="#515151">
                    <span>위치</span>
                    <p>{String(data?.address?.fullAddress)}</p>
                  </S.Line>
                  <StateRow>
                    <div>
                      <span>운영시간</span>
                      {data?.totalBusinessHoursResDto ? (
                        <Column>
                          {dayArr.map((item, i) => (
                            <p key={i}>
                              {data?.totalBusinessHoursResDto[item.key] &&
                                `${item.name} ${data?.totalBusinessHoursResDto[item.key]?.open}-${
                                  data?.totalBusinessHoursResDto[item.key]?.closed
                                }`}
                            </p>
                          ))}
                        </Column>
                      ) : (
                        "-"
                      )}
                    </div>
                  </StateRow>
                  <S.Line color="#515151">
                    <span>기타 시간</span>
                    <p>{data?.businessHoursResDto?.etcTime || "-"}</p>
                  </S.Line>
                  <S.Line color="#515151">
                    <span>와이파이</span>
                    <p>{data?.wifiPassword || "-"}</p>
                  </S.Line>
                  <S.Line color="#515151">
                    <span>전화번호</span>
                    <p>{data?.phone || "-"}</p>
                  </S.Line>
                  <S.Line color="#515151">
                    <span>웹사이트</span>
                    <p>{data?.website || "-"}</p>
                  </S.Line>
                </Columnbox>
              </Columnbox>
            </ModalBoxs>
            <ModalBoxs style={{ borderRadius: "0 16px 16px 0" }} color="#333333" width={476}>
              <Row justify="space-between">
                <Title size={16}>활동정보</Title>
                <Close style={{ cursor: "pointer" }} onClick={closeModal} />
              </Row>
              <Columnbox>
                <S.Line color="#515151">
                  <span>조회</span>
                  <p>{data?.viewCnt ? data?.viewCnt + "회" : "-"}</p>
                </S.Line>
                <S.Line color="#515151">
                  <span>저장</span>
                  <p>{data?.heartCnt ? data?.heartCnt + "회" : "-"}</p>
                </S.Line>
                <S.Line color="#515151">
                  <span>공유</span>
                  <p>{"-"}</p>
                </S.Line>
                <S.Line color="#515151">
                  <span>혼잡도</span>
                  <Row gap={10}>
                    <p>{data?.congestionCnt ? data?.congestionCnt + "개" : "-"}</p>
                    {!!data?.congestionCnt && <Page onClick={() => setCongestionVisible(true)} />}
                    {congestionScore && (
                      <CongestionBtn id={parseInt(congestionScore)}>
                        {parseInt(congestionScore) == 1
                          ? "여유"
                          : parseInt(congestionScore) == 2
                          ? "보통"
                          : "혼잡"}
                      </CongestionBtn>
                    )}
                  </Row>
                </S.Line>
                <S.Line color="#515151">
                  <span>리뷰</span>
                  <Row gap={10}>
                    <p>{data?.reviewCnt ? data?.reviewCnt + "개" : "-"}</p>
                    {!!data?.reviewCnt && (
                      <Page onClick={() => navigate("/review", { state: data?.storeId })} />
                    )}
                  </Row>
                </S.Line>
              </Columnbox>
              <Title style={{ paddingTop: "40px" }} size={16}>
                <Row justify="space-between">
                  <Title size={16}>카공 정보</Title>
                  <p style={{ fontWeight: "400" }}>5점 만점</p>
                </Row>
              </Title>
              <Columnbox style={{ paddingBottom: "140px" }}>
                <S.Line color="#515151">
                  <span>전체</span>
                  <p>
                    {reviewData?.recommendPercent ? reviewData?.recommendPercent + "% 추천" : "-"}
                  </p>
                </S.Line>
                <HoverLine color="#515151">
                  <span>콘센트</span>
                  <p>{totalfunc(reviewData?.socket)} 점</p>
                </HoverLine>
                <HoverBox late={20}>
                  <HoverContent obj={reviewData?.socket} />
                </HoverBox>
                <HoverLine color="#515151">
                  <span>화장실</span>
                  <p>{totalfunc(reviewData?.restroom)} 점</p>
                </HoverLine>
                <HoverBox late={55}>
                  <HoverContent obj={reviewData?.restroom} />
                </HoverBox>
                <HoverLine color="#515151">
                  <span>테이블</span>
                  <p>{totalfunc(reviewData?.tableSize)} 점</p>
                </HoverLine>
                <HoverBox late={90}>
                  <HoverContent obj={reviewData?.tableSize} />
                </HoverBox>
                <HoverLine color="#515151">
                  <span>와이파이</span>
                  <p>{totalfunc(reviewData?.wifi)} 점</p>
                </HoverLine>
                <HoverBox late={120}>
                  <HoverContent obj={reviewData?.wifi} />
                </HoverBox>
              </Columnbox>
              <Row gap={24}>
                <S.Btn style={{ border: "1px solid #515151" }} onClick={() => setAlert(true)}>
                  삭제
                </S.Btn>
                <S.Btn
                  color="#515151"
                  onClick={() =>
                    navigate("/management/editCafe", {
                      state: data,
                    })
                  }
                >
                  수정
                </S.Btn>
              </Row>
            </ModalBoxs>
          </ModalBox>
        )}
      </Portal>
      {slider && (
        <Sliders
          storeId={data?.storeId}
          setModal={setSlider}
          imgs={imgList}
          main={data?.presentImageDto}
          loadData={loadData}
        />
      )}
      {congestionVisible && (
        <CongestionModal
          storeId={data?.storeId}
          storeName={data?.storeName}
          setModal={setCongestionVisible}
        />
      )}
      {alert && (
        <RedAlert
          text="카페 삭제"
          text1="카페를"
          text2=" 삭제"
          text3="하시겠습니까?"
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
  height: 850px;
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
  height: 850px;
  box-sizing: border-box;
  background-color: ${(props) => props.color && props.color};
  color: #fff;
  padding: 40px;
`;

const Title = styled.p`
  font-size: ${(props) => props.size}px;
  font-weight: 700;
  color: #f6f6f6;
  padding-bottom: 30px;
`;

const HoverLine = styled(S.Line)`
  :hover {
    & + div {
      display: inline;
    }
  }
`;

const StateRow = styled.div`
  display: flex;
  padding-bottom: 13px;

  border-bottom: 1px solid #515151;
  & > div {
    display: flex;

    gap: 32px;
    align-items: start;
    & > span {
      width: 100px;
      text-align: right;
      font-size: 16px;
      font-weight: 700;
      color: #8b8b8b;
    }
    & > p {
      // margin-left: 80px;
      // font-weight: 700;
      // color: #f44336;
    }
  }
`;
const Columnbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 10px 0 10px;
`;

const Photo = styled.div`
  width: 72px;
  height:72px;
  background: ${({ img }) => img && `url(${img})`} no-repeat center center/cover;
  border-radius: 6px;
  cursor:pointer;
  }
`;

const PhotoPlus = styled.div`
  width: 72px;
  height: 72px;
  cursor: pointer;
  background-color: #333333;
  display: flex;
  color: #acacac;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  line-height: 14px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  & > p {
    font-size: 14px;
  }
`;
const HoverBox = styled.div`
  display: none;
  padding: 17px;
  box-sizing: border-box;
  position: absolute;
  z-index: 9;
  color: red;
  background-color: #646464;
  border-radius: 4px;
  transform: translate(120%, ${(props) => props.late && props.late}%);
`;

const CongestionBtn = styled.div`
  padding: 5px;
  background-color: ${(props) =>
    props.id == 1 ? "#DFF5E8" : props.id == 2 ? "#FFF3E0" : "#FFEBEE"};
  color: ${(props) => (props.id == 1 ? "#26BA6A" : props.id == 2 ? "#FF9800" : "#F44336")};
  border-radius: 4px;
`;

const StarBox = styled.div`
  position: relative;
  & > svg {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 5px;
    right: 5px;
    path {
      fill: #ffce4a;
    }
  }
`;
