import React, { useEffect, useState } from "react";
import Portal from "../../modal/Portal";
import * as S from "../../modal/style";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import Slider from "./slider";

export default function Sliders({ imgs, setModal }) {
  const closeModal = () => {
    setModal(false);
  };

  let file = [];
  useEffect(() => {
    if (imgs) {
      imgs = imgs.concat(imgs);
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
          <p>카페 이미지 상세</p>
          <Close onClick={closeModal} />
        </S.ModalHeader>
        <Slider imgs={file} />
      </S.ModalBox>
    </Portal>
  );
}
