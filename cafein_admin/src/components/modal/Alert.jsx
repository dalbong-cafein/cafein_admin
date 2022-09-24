import React from "react";
import Portal from "./Portal";
import * as S from "./style";
import Row from "../atoms/row";

const Alert = ({ setAlert, text, subtext, func, forFunc }) => {
  const closeModal = () => {
    setAlert(false);
  };
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertContent>
          <p>{text}</p>
          <p style={{ fontSize: "14px" }}>{subtext}</p>
          <Row justify="end" gap={16}>
            <S.AlertBtn color="#515151" onClick={closeModal}>
              취소
            </S.AlertBtn>
            <S.AlertBtn color="#2563eb" onClick={() => func(forFunc)}>
              확인
            </S.AlertBtn>
          </Row>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
};
export default Alert;
