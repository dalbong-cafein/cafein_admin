import styled from "styled-components";

export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #333333;
  box-sizing: border-box;
  border: 1px solid #515151;
  border-radius: 8px;
  width: 400px;
  height: 180px;
  padding: 32px 24px 24px;
`;

export const Btn = styled.div`
  color: #fff;
  width: 74px;
  height: 32px;
  background-color: ${(props) => props.color && props.color};
  border-radius: 6px;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
`;
export const ModalContent = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;
  & > p:first-child {
    font-size: 20px;
    font-weight: bold;
  }
  & > p:nth-child(2) {
    font-size: 14px;
  }
`;
