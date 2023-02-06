import React, { useEffect, useState } from "react";
import Portal from "../../modal/Portal";
import * as S from "../../modal/style";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import { ReactComponent as ArrowR } from "../../../svg/arrowRight.svg";
import { ReactComponent as ArrowL } from "../../../svg/arrowLeft.svg";
import { ReactComponent as Star } from "../../../svg/Star.svg";

import Row from "../../atoms/row";
import usePagination from "../../../hooks/usePagination";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import Paging from "../Pagination";
import { cafeChangeImgApi } from "../../../util/management";
import Alert from "../../modal/Alert";
import RedAlert from "../../modal/RedAlert";

export default function Sliders({ loadData, storeId, main, imgs, setModal }) {
  const closeModal = () => {
    setModal(false);
  };
  const [idx, setIdx] = useState(main ? "main" : 0);
  const [alert, setAlert] = useState(false);

  const onPressChangeMainImg = () => {
    if (idx != "main") {
      cafeChangeImgApi(storeId, imgs[idx].imageId).then((res) => {
        loadData();
        setModal(false);
      });
    }
  };

  console.log(imgs);
  // pagination
  const [page, _, item, count, setCount, setPage] = usePagination(21);

  useEffect(() => {
    setCount(() => imgs.length);
  }, []);

  return (
    <Portal setModal={setModal}>
      <S.ModalBox>
        <S.ModalHeader>
          <Row>
            <p style={{ color: "#f6f6f6", fontSize: "20px", fontWeight: "bold" }}>
              카페 상세 이미지
            </p>
            <p style={{ color: "#f6f6f6" }}></p>
          </Row>
          <Close onClick={closeModal} />
        </S.ModalHeader>
        <Container>
          <div>
            <div>
              {main && (
                <StarBox>
                  <SmImg onClick={() => setIdx("main")}>
                    <img src={main.imageUrl} alt="" />
                  </SmImg>
                  <Star />
                </StarBox>
              )}
              {imgs.slice((page - 1) * item, (page - 1) * item + item).map((item, i) => (
                <SmImg key={i} onClick={() => setIdx(i)}>
                  <img src={item.imageUrl} alt="" />
                </SmImg>
              ))}
            </div>
            <div>
              <Paging
                page={page}
                count={count}
                item={item}
                handlePageChange={(page) => setPage(page)}
              />
            </div>
          </div>
          <div
            style={{
              width: "60%",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {imgs && (
              <Box>
                <IconBox
                  isLeft
                  onClick={() => {
                    if (idx == 0) {
                      setIdx("main");
                    } else setIdx(idx - 1);
                  }}
                >
                  <ArrowL />
                </IconBox>
                <IconBox
                  onClick={() => {
                    if (idx == "main") {
                      setIdx(0);
                    } else setIdx(idx + 1);
                  }}
                >
                  <ArrowR />
                </IconBox>

                <img src={idx == "main" ? main?.imageUrl : imgs[idx].imageUrl} alt="" />
                <ChangeMainImg isMain={idx == "main"} onClick={() => setAlert(true)}>
                  {idx == "main" ? "대표 이미지" : "대표 이미지 설정"}
                </ChangeMainImg>
                <p>
                  {idx == "main" ? 1 : idx + 1} / {count}
                </p>
              </Box>
            )}
          </div>
        </Container>
      </S.ModalBox>
      {alert && (
        <RedAlert
          text="대표 이미지 설정"
          text1="이미지를"
          text2={` 대표 이미지로 설정`}
          text3="하시겠습니까?"
          setAlert={setAlert}
          func={onPressChangeMainImg}
          forFunc={null}
        />
      )}
    </Portal>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  & > div:first-child {
    width: 40%;
    padding-top: 30px;

    & > div:first-child {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
    & > div:last-child {
      position: absolute;
      bottom: 24px;
      left: 120px;
      padding: 0 auto;
    }
  }
`;
const Box = styled.div`
  width: 95%;
  height: 350px;
  padding: 10px 0;
  border-radius: 4px;
  position: relative;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
  }
  & > p {
    width: 100%;
    text-align: center;
    padding-top: 20px;
    color: #fff;
  }
`;
const SmImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;
const IconBox = styled.div`
  position: absolute;
  ${(props) => (props.isLeft ? "left:0;" : "right:0;")}
  top : 50%;
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

const ChangeMainImg = styled.div`
  padding: 15px;
  background-color: rgba(19, 19, 19, 0.8);
  position: absolute;
  top: 300px;
  left: ${(props) => (props.isMain ? "38%" : "32%")};
  color: #fc7521;
  border-radius: 32px;
`;
