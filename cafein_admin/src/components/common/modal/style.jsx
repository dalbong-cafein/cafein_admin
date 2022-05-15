import styled from "styled-components";

export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #000;
  box-sizing: border-box;
  // padding: 0 40px 40px;
  border: 1px solid #515151;
  border-radius: 16px;
  width: 727px;
  height: 694px;
`;
export const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  & > p {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
`;
export const ModalFooter = styled.div`
  display: flex;
  width: inherit;
  box-sizing: border-box;
  position: absolute;
  bottom: 40px;
  left: 40px;
  justify-content: space-between;
  align-items: baseline;
  & > p {
    color: #acacac;
    font-size: 16px;
  }
`;

export const Btn = styled.div`
  color: #fff;
  width: 180px;
  height: 40px;
  background-color: ${(props) => props.color && props.color};
  border-radius: 6px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
`;
export const ModalContent = styled.div`
  color: #fff;
  min-height: 400px;
  padding: 0 40px;
`;
