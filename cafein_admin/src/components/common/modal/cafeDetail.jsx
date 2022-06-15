import React from "react";
import Portal from "./Portal";
import * as S from "./style";
import styled from "styled-components";

import { ReactComponent as Close } from "../../../svg/close2.svg";
import Row from "../../atoms/row";

import HoverContent from "../../hoverContent";
import { useNavigate } from "react-router-dom";

export default function CafeDetailModal({ data, setDModal, dSelected }) {
  const closeModal = () => {
    setDModal(false);
  };
  const navigate = useNavigate();

  const totalfunc = (title) => {
    if (title) {
      const values = Object.values(title);

      return values.reduce((a, b) => a + b);
    }
  };
  return (
    <Portal>
      <ModalBox>
        <ModalBoxs
          style={{ borderRadius: "16px 0 0 16px" }}
          color={"#131313"}
          width={516}
        >
          <Title size={20}>카페 상세</Title>
          <Columnbox gap={14}>
            <Line>
              <span>분류</span>
              <p>{String(dSelected.storeId).padStart(6, "0")}</p>
            </Line>
            <Line>
              <span>회원 번호</span>
              <p>{dSelected.modMemberId}</p>
            </Line>
            <Line>
              <span>카페명</span>
              <p>{dSelected.storeName}</p>
            </Line>
            <Line>
              <span>등록일</span>
              <p>{`${dSelected.regDateTime.replace("T", " ")}`}</p>
            </Line>
            <Line>
              <span>최종수정일</span>
              <p>{`${dSelected.modDateTime.replace("T", " ")}`}</p>
            </Line>

            <Title style={{ padding: "40px 0 20px" }} size={16}>
              기본 정보
            </Title>
            <Columnbox>
              <StateRow>
                <div>
                  <Row justify={"center"} gap={8} style={{ padding: "0 auto" }}>
                    {dSelected.storeImageDtoList &&
                    dSelected.storeImageDtoList.length > 4 ? (
                      <>
                        {dSelected.storeImageDtoList
                          .slice(0, 4)
                          .map((item, i) => (
                            <Photo key={i} img={item.imageUrl} />
                          ))}
                        <PhotoPlus>
                          +{dSelected?.storeImageDtoList?.length}
                        </PhotoPlus>
                      </>
                    ) : (
                      dSelected.storeImageDtoList.map((item, i) => (
                        <Photo key={i} img={item.imageUrl} />
                      ))
                    )}
                  </Row>
                </div>
              </StateRow>
              <Line color={"#515151"}>
                <span>위치</span>
                <p>{String(dSelected?.address?.fullAddress)}</p>
              </Line>
              <StateRow>
                <div>
                  <span>운영시간</span>
                  {dSelected?.businessHoursResDto && (
                    <Column>
                      <p>
                        월
                        {` ${dSelected?.businessHoursResDto?.onMon?.open}-${dSelected?.businessHoursResDto?.onMon?.closed}`}
                      </p>
                      <p>
                        화
                        {` ${dSelected?.businessHoursResDto?.onTue?.open}-${dSelected?.businessHoursResDto?.onTue?.closed}`}
                      </p>
                      <p>
                        수
                        {` ${dSelected?.businessHoursResDto?.onWed?.open}-${dSelected?.businessHoursResDto?.onWed?.closed}`}
                      </p>
                      <p>
                        목
                        {` ${dSelected?.businessHoursResDto?.onThu?.open}-${dSelected?.businessHoursResDto?.onThu?.closed}`}
                      </p>
                      <p>
                        금
                        {` ${dSelected?.businessHoursResDto?.onFri?.open}-${dSelected?.businessHoursResDto?.onFri?.closed}`}
                      </p>
                      <p>
                        토
                        {` ${dSelected?.businessHoursResDto?.onSat?.open}-${dSelected?.businessHoursResDto?.onSat?.closed}`}
                      </p>
                      <p>
                        일
                        {` ${dSelected?.businessHoursResDto?.onSun?.open}-${dSelected?.businessHoursResDto?.onSun?.closed}`}
                      </p>
                    </Column>
                  )}
                </div>
              </StateRow>
              <Line color={"#515151"}>
                <span>기타 시간</span>
                <p>{dSelected?.businessHoursResDto?.etcTime}</p>
              </Line>
              <Line color={"#515151"}>
                <span>와이파이</span>
                <p>{dSelected?.wifiPassword}</p>
              </Line>
              <Line color={"#515151"}>
                <span>전화번호</span>
                <p>{dSelected?.phone}</p>
              </Line>
              <Line color={"#515151"}>
                <span>웹사이트</span>
                <p>{dSelected?.website}</p>
              </Line>
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
            <Close onClick={closeModal} />
          </Row>
          <Columnbox style={{ paddingBottom: "40px" }}>
            <Line color={"#515151"}>
              <span>조회</span>
              <p>{dSelected?.viewCnt}</p>
            </Line>
            <Line color={"#515151"}>
              <span>저장</span>
              <p>{dSelected?.heartCnt}</p>
            </Line>
            <Line color={"#515151"}>
              <span>공유</span>
              <p>{dSelected?.congestionCnt}</p>
            </Line>
            <Line color={"#515151"}>
              <span>혼잡도</span>
              <p>{dSelected?.congestionCnt}</p>
            </Line>
            <Line color={"#515151"}>
              <span>리뷰</span>
              <p>{dSelected?.reviewCnt}</p>
            </Line>
          </Columnbox>
          <Title style={{ padding: "40px 0" }} size={16}>
            카공 정보
          </Title>
          <Columnbox style={{ paddingBottom: "190px" }}>
            <Line color={"#515151"}>
              <span>전체</span>
              <p>{data?.recommendPercent}% 추천</p>
            </Line>
            <HoverLine color={"#515151"}>
              <span>콘센트</span>
              <p>{totalfunc(data?.socket)}</p>
            </HoverLine>
            <HoverBox late={20}>
              <HoverContent obj={data?.socket} />
            </HoverBox>

            <HoverLine color={"#515151"}>
              <span>화장실</span>
              <p>{totalfunc(data?.restroom)}</p>
            </HoverLine>
            <HoverBox late={55}>
              <HoverContent obj={data?.restroom} />
            </HoverBox>
            <HoverLine color={"#515151"}>
              <span>테이블</span>
              <p>{totalfunc(data?.tableSize)}</p>
            </HoverLine>
            <HoverBox late={90}>
              <HoverContent obj={data?.tableSize} />
            </HoverBox>
            <HoverLine color={"#515151"}>
              <span>와이파이</span>
              <p>{totalfunc(data?.wifi)}</p>
            </HoverLine>
            <HoverBox late={120}>
              <HoverContent obj={data?.wifi} />
            </HoverBox>
          </Columnbox>
          <Row gap={24}>
            <S.Btn style={{ border: "1px solid #515151" }}>삭제</S.Btn>
            <S.Btn
              color={"#515151"}
              onClick={() =>
                navigate("/management/editCafe", {
                  state: dSelected,
                })
              }
            >
              수정
            </S.Btn>
          </Row>
        </ModalBoxs>
      </ModalBox>
    </Portal>
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
const Line = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  padding-bottom: 12px;
  border-bottom: 1px solid ${(props) => (props.color ? props.color : "#333333")};
  & > span {
    width: 80px;
    text-align: right;
    font-size: 16px;
    font-weight: 700;
    color: #8b8b8b;
  }
  & > p:nth-child(2) {
    width: 230px;
    color: #e3e3e3;
  }
`;

const HoverLine = styled(Line)`
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
      width: 80px;
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

const Pic = styled.div`
  width: 64px;
  height: 64px;
  background-color: #c4c4c4;
  & > div {
    background-img: ${(props) => props.img && props.img};
    z-index: 9;
    width: 100%;
    height: 100%;
  }
`;

const Btn = styled.div`
  background-color: ${(props) =>
    props.content === "기본"
      ? "#26BA6A"
      : props.content === "신고"
      ? "#f44336"
      : "#ff9800"};
  width: 96px;
  height: 26px;
  text-align: center;
  opacity: 0.3;
  border-radius: 6px;
  color: #fff;
  line-height: 26px;
`;

const Photo = styled.div`
  width: 72px;
  height:72px;
  background: ${({ img }) =>
    img && `url(${img})`} no-repeat center center/cover;
  border-radius: 6px;
  }
`;

const PhotoPlus = styled.div`
width: 72px;
height:72px;
  background-color: #333333;
  display:flex;
  color:#ACACAC;
  font-size:14px;
  justify-content: center;
  align-items:center;
  border-radius: 6px;
  line-height: 14px;
  }
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
