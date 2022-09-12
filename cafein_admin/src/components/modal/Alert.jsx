import React from "react";
import Portal from "./Portal";
import * as S from "./alertstyle";
import Row from "../atoms/row";

const Alert = ({ setAlert, text, subtext, func, forFunc }) => {
  const closeModal = () => {
    setAlert(false);
  };
  return (
    <Portal>
      <S.ModalBox>
        <S.ModalContent>
          <p>{text}</p>
          <p style={{ fontSize: "14px" }}>{subtext}</p>
          <Row justify={"end"} gap={16}>
            <S.Btn color={"#515151"} onClick={closeModal}>
              취소
            </S.Btn>
            <S.Btn color={"#2563eb"} onClick={() => func(forFunc)}>
              확인
            </S.Btn>
          </Row>
        </S.ModalContent>
      </S.ModalBox>
    </Portal>
  );
};
export default Alert;
