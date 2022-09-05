import React, { useState } from "react";
import Portal from "./Portal";
import * as S from "./style";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Close } from "../../../svg/close2.svg";
import Row from "../../atoms/row";
import HoverContent from "../../HoverContent";
import Sliders from "../carousel/carousel";
import RedAlert from "./RedAlert";
import {
  cafeDelApi,
  feedDetailApi,
  feedDetailReviewApi,
} from "../../../util/management";
import { useEffect } from "react";

export default function CafeDetailModal({ setDModal, id }) {
  const closeModal = () => {
    setDModal(false);
  };

  const [data, setData] = useState([]);
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

  useEffect(() => {
    feedDetailApi(id)
      .then((res) => {
        setData(res.data.data);
        feedDetailReviewApi(res.data.data.storeId).then((res) => {
          setReviewData(res.data.data);
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Portal>
        {data && reviewData && (
          <ModalBox>
            <ModalBoxs
              style={{ borderRadius: "16px 0 0 16px" }}
              color={"#131313"}
              width={516}
            >
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

                <Title style={{ padding: "40px 0 20px" }} size={16}>
                  기본 정보
                </Title>
                <Columnbox>
                  <StateRow>
                    <div>
                      <Row
                        justify={"center"}
                        gap={8}
                        style={{ padding: "0 auto" }}
                      >
                        {data?.storeImageDtoList &&
                        data?.storeImageDtoList.length > 4 ? (
                          <>
                            {data?.storeImageDtoList
                              .slice(0, 4)
                              .map((item, i) => (
                                <Photo
                                  key={i}
                                  img={item.imageUrl}
                                  onClick={() => setSlider(true)}
                                />
                              ))}
                            <PhotoPlus onClick={() => setSlider(true)}>
                              +{data?.storeImageDtoList?.length - 4}
                            </PhotoPlus>
                          </>
                        ) : (
                          <>
                            {data?.storeImageDtoList?.map((item, i) => (
                              <Photo
                                key={i}
                                img={item.imageUrl}
                                onClick={() => setSlider(true)}
                              />
                            ))}
                          </>
                        )}
                      </Row>
                    </div>
                  </StateRow>
                  <S.Line color={"#515151"}>
                    <span>위치</span>
                    <p>{String(data?.address?.fullAddress)}</p>
                  </S.Line>
                  <StateRow>
                    <div>
                      <span>운영시간</span>
                      {data?.businessHoursResDto && (
                        <Column>
                          <p>
                            월
                            {` ${data?.businessHoursResDto?.onMon?.open}-${data?.businessHoursResDto?.onMon?.closed}`}
                          </p>
                          <p>
                            화
                            {` ${data?.businessHoursResDto?.onTue?.open}-${data?.businessHoursResDto?.onTue?.closed}`}
                          </p>
                          <p>
                            수
                            {` ${data?.businessHoursResDto?.onWed?.open}-${data?.businessHoursResDto?.onWed?.closed}`}
                          </p>
                          <p>
                            목
                            {` ${data?.businessHoursResDto?.onThu?.open}-${data?.businessHoursResDto?.onThu?.closed}`}
                          </p>
                          <p>
                            금
                            {` ${data?.businessHoursResDto?.onFri?.open}-${data?.businessHoursResDto?.onFri?.closed}`}
                          </p>
                          <p>
                            토
                            {` ${data?.businessHoursResDto?.onSat?.open}-${data?.businessHoursResDto?.onSat?.closed}`}
                          </p>
                          <p>
                            일
                            {` ${data?.businessHoursResDto?.onSun?.open}-${data?.businessHoursResDto?.onSun?.closed}`}
                          </p>
                        </Column>
                      )}
                    </div>
                  </StateRow>
                  <S.Line color={"#515151"}>
                    <span>기타 시간</span>
                    <p>{data?.businessHoursResDto?.etcTime}</p>
                  </S.Line>
                  <S.Line color={"#515151"}>
                    <span>와이파이</span>
                    <p>{data?.wifiPassword}</p>
                  </S.Line>
                  <S.Line color={"#515151"}>
                    <span>전화번호</span>
                    <p>{data?.phone}</p>
                  </S.Line>
                  <S.Line color={"#515151"}>
                    <span>웹사이트</span>
                    <p>{data?.website}</p>
                  </S.Line>
                </Columnbox>
              </Columnbox>
            </ModalBoxs>
            <ModalBoxs
              style={{ borderRadius: "0 16px 16px 0" }}
              color={"#333333"}
              width={476}
            >
              <Row justify={"space-between"}>
                <Title size={16}>활동정보</Title>
                <Close style={{ cursor: "pointer" }} onClick={closeModal} />
              </Row>
              <Columnbox style={{ paddingBottom: "40px" }}>
                <S.Line color={"#515151"}>
                  <span>조회</span>
                  <p>{data?.viewCnt}</p>
                </S.Line>
                <S.Line color={"#515151"}>
                  <span>저장</span>
                  <p>{data?.heartCnt}</p>
                </S.Line>
                <S.Line color={"#515151"}>
                  <span>공유</span>
                  <p>{data?.congestionCnt}</p>
                </S.Line>
                <S.Line color={"#515151"}>
                  <span>혼잡도</span>
                  <p>{data?.congestionCnt}</p>
                </S.Line>
                <S.Line color={"#515151"}>
                  <span>리뷰</span>
                  <p>{data?.reviewCnt}</p>
                </S.Line>
              </Columnbox>
              <Title style={{ padding: "40px 0" }} size={16}>
                카공 정보
              </Title>
              <Columnbox style={{ paddingBottom: "190px" }}>
                <S.Line color={"#515151"}>
                  <span>전체</span>
                  <p>{reviewData?.recommendPercent}% 추천</p>
                </S.Line>
                <HoverLine color={"#515151"}>
                  <span>콘센트</span>
                  <p>{totalfunc(reviewData?.socket)}</p>
                </HoverLine>
                <HoverBox late={20}>
                  <HoverContent obj={reviewData?.socket} />
                </HoverBox>
                <HoverLine color={"#515151"}>
                  <span>화장실</span>
                  <p>{totalfunc(reviewData?.restroom)}</p>
                </HoverLine>
                <HoverBox late={55}>
                  <HoverContent obj={reviewData?.restroom} />
                </HoverBox>
                <HoverLine color={"#515151"}>
                  <span>테이블</span>
                  <p>{totalfunc(reviewData?.tableSize)}</p>
                </HoverLine>
                <HoverBox late={90}>
                  <HoverContent obj={reviewData?.tableSize} />
                </HoverBox>
                <HoverLine color={"#515151"}>
                  <span>와이파이</span>
                  <p>{totalfunc(reviewData?.wifi)}</p>
                </HoverLine>
                <HoverBox late={120}>
                  <HoverContent obj={reviewData?.wifi} />
                </HoverBox>
              </Columnbox>
              <Row gap={24}>
                <S.Btn
                  style={{ border: "1px solid #515151" }}
                  onClick={() => setAlert(true)}
                >
                  삭제
                </S.Btn>
                <S.Btn
                  color={"#515151"}
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
        <Sliders setModal={setSlider} imgs={data?.storeImageDtoList} />
      )}
      {alert && (
        <RedAlert
          text={"카페 삭제"}
          text1={"카페를"}
          text2={" 삭제"}
          text3={"하시겠습니까?"}
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
  height: 930px;
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
  height: 930px;
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
  background: ${({ img }) =>
    img && `url(${img})`} no-repeat center center/cover;
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
  width: 164px;
  height: 136px;
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
