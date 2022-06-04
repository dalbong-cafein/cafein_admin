import styled from "styled-components";

export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #131313;
  box-sizing: border-box;
  padding: 40px;
  border: 1px solid #515151;
  border-radius: 16px;
  width: 727px;
  height: 694px;
`;
export const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  & > p {
    color: #f6f6f6;
    font-size: 20px;
    font-weight: bold;
  }
`;
export const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
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
  height: 520px;

  & > textarea {
    width: 90%;
    heigth: 350px;
    background-color: #131313;
    color: #e3e3e3;
    border: 0;
    &:focus {
      outline: none;
    }
  }

  & > div {
    width: 90%;
    heigth: 350px;
    color: #e3e3e3;
  }
`;
