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
  height: ${(props) => (props.height ? props.height : "694px")};
`;

export const ModalBigBox = styled(ModalBox)`
  width: ${(props) => (props.double ? "1454px" : "727px")};
  height: 700px;
  padding: 0;
`;
export const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  & > p:first-child {
    color: #f6f6f6;
    font-size: 20px;
    font-weight: bold;
  }
  & > svg {
    cursor: pointer;
  }
`;

export const ViewHeader = styled(ModalHeader)`
  & > div:first-child {
    display: flex;
    align-items: baseline;

    & > p:first-child {
      color: #f6f6f6;
      font-size: 20px;
      font-weight: bold;
      margin-right: 24px;
    }
    & > p:nth-child(2) {
      color: #e3e3e3;
      font-size: 16px;
      font-weight: bold;
      margin-right: 16px;
    }
    & > p:nth-child(3) {
      font-size: 16px;
      color: #e3e3e3;
    }
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
  height: ${(props) => (props.height ? props.height : "520px")};
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: none;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: gray;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }

  & > textarea {
    padding: 24px 0;
    width: 90%;

    height: 250px;
    font-size: 16px;
    background-color: #131313;
    color: #e3e3e3;
    border: 0;
    &:focus {
      outline: none;
    }
  }

  & > div {
    width: 100%;
    white-space: pre-line;
    line-height: 22.4px;
    heigth: 350px;
    max-height: 450px;
    color: #e3e3e3;
  }
`;
