import React, { useEffect, useState } from "react";
import Portal from "../../modal/Portal";
import * as S from "../../modal/style";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import { ReactComponent as ArrowR } from "../../../svg/arrowRight.svg";
import { ReactComponent as ArrowL } from "../../../svg/arrowLeft.svg";

import Row from "../../atoms/row";
import usePagination from "../../../hooks/usePagination";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import Paging from "../Pagination";

export default function Sliders({ imgs, setModal }) {
  const closeModal = () => {
    setModal(false);
  };
  const [idx, setIdx] = useState(0);

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
          <div style={{ width: "60%", display: "flex", justifyContent: "center" }}>
            {imgs && (
              <Box>
                <IconBox isLeft onClick={() => setIdx(idx - 1)}>
                  <ArrowL />
                </IconBox>
                <IconBox onClick={() => setIdx(idx + 1)}>
                  <ArrowR />
                </IconBox>

                <img src={imgs[idx].imageUrl} alt="" />
                <p>
                  {idx + 1} / {count}
                </p>
              </Box>
            )}
          </div>
        </Container>
      </S.ModalBox>
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
