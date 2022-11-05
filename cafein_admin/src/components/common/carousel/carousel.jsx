import React, { useEffect, useState } from "react";
import Portal from "../../modal/Portal";
import * as S from "../../modal/style";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import Slider from "./slider";
import Row from "../../atoms/row";

export default function Sliders({ imgs, setModal }) {
  const closeModal = () => {
    setModal(false);
  };

  let file = [];
  useEffect(() => {
    if (imgs) {
      for (let i = 0; i < imgs.length; i++) {
        file.push(imgs[i].imageUrl);
      }
    }
    console.log(file);
  });

  return (
    <Portal setModal={setModal}>
      <S.ModalBox>
        <S.ModalHeader>
          <Row>
            <p style={{ color: "#f6f6f6", fontSize: "20px", fontWeight: "bold" }}>
              카페 이미지 상세
            </p>
            <p style={{ color: "#f6f6f6" }}></p>
          </Row>
          <Close onClick={closeModal} />
        </S.ModalHeader>
        <Slider imgs={file} />
      </S.ModalBox>
    </Portal>
  );
}
