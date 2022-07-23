import styled from "styled-components";

export const Containaer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
export const Submit = styled.button`
  width: 88px;
  height: 36px;
  line-height: 34px;
  text-align: center;
  border-radius: 6px;
  border: none;
  background-color: ${(props) => (props.isFill ? "#2563EB" : "#333333")};
  color: #fff;
  transform: translate(20px, 0);
`;
export const Input1 = styled.input`
  width: 100%;
  height: 48px;
  background-color: #333333;
  color: #8b8b8b;
  border-radius: 6px;
  border: 0;
  font-weight: 500;
  font-size: 16px;
  box-sizing: border-box;
  padding: 16px;
  &:focus {
    outline: none;
  }
`;

export const InputBox = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 6px;
  color: #8b8b8b;
  font-weight: 500;
  background-color: #333333;
  & > svg {
  }
  & > input {
    width: 70%;
    border: 0;
    color: #e3e3e3;
    background-color: inherit;
    font-size: 16px;
    font-weight: 400;
    &:focus {
      outline: none;
    }
  }
  & > div {
    color: #e3e3e3;
  }
`;
export const Column = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  gap: 16px;
`;

export const Box = styled.div`
  background-color: #333333;
  color: #8b8b8b;
  width: 100%;
  box-sizing: border-box;

  min-height: ${(props) => props.height}px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  & > p {
    padding: 16px 0 16px 16px;
    font-weight: 500;
  }
`;

export const PhotoBox = styled.div`
  padding: 0 24px;
  display: flex;
  gap: 12px;
`;

export const FileUpload = styled.div`
  width: 80px;
  height: 80px;
  background: #c4c4c4;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 9.5px;
  cursor: pointer;
  & > div {
    color: #646464;
    font-size: 13px;
    font-weight: 500;
  }
`;

export const ImgBox = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  display: inline-block;
  border-radius: 6px;
  & > svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(50px, 5px);
  }
`;

export const TimeBox = styled.div`
  width: 100%;
  display: flex;
  max-height: 155px;
  overflow-y: scroll;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
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
`;

export const Day = styled.div`
  display: flex;
  padding-left: 16px;
  align-items: center;
  gap: 12px;
  & > p {
    cursor: pointer;
    font-size: 14px;
    color: #ff5c50;
  }
  & > div {
    padding: 13px 16px;
    display: flex;
    align-items: center;
    border: 1px solid #acacac;
    border-radius: 6px;
    font-size: 14px;
    color: #e3e3e3;
    box-sizing: border-box;
  }
  & > div:first-child,
  div:nth-child(2) {
    min-width: 135px;
  }
`;

export const BtnRow = styled.div`
  display: flex;
  gap: 13px;
  padding-left: 16px;
  & > svg {
    padding: 15px;
    border-radius: 6px;
    background-color: #fc7521;
  }
`;

export const Btn = styled.div`
  padding: 13px 0 13px 16px;
  border: 1px solid #acacac;
  border-radius: 6px;
  font-size: 14px;
  width: 135px;
  box-sizing: border-box;
  background-color: #333333;
  display: flex;
  align-items: baseline;
  color: #fff;
  gap: 24px;
  & > p {
  }
  & > input {
    max-width: 60px;
    border: 0;
    background-color: #333333;
    color: #fff;
    &:focus {
      outline: none;
    }
  }
`;

export const Btn2 = styled.div`
  padding: 13px 21px 13px 16px;
  border: 1px solid #acacac;
  color: ${(props) => (props.isT ? "#E3E3E3" : "#8b8b8b")};
  font-size: 14px;
  min-width: 86px;
  box-sizing: border-box;
  position: relative;
  border-radius: 6px;
  & > div > svg {
    padding-bottom: 2px;
  }
`;

export const ComboBox = styled.div`
  width: 94px;
  height: 230px;
  margin: 0 10px;
  background-color: #646464;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  position: absolute;
  transform: translate(
    ${(props) => (props.x ? props.x : "320%")},
    ${(props) => (props.y ? props.y : "130%")}
  );
  padding: 15px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div {
    text-align: center;
    padding: 3px;
    cursor: pointer;
  }
`;
export const RowBox = styled.div`
  display: flex;
  padding: 0 125px;
  justify-content: center;
  gap: 100px;
  & > div {
    & > p {
      padding-top: 12px;
      color: #acacac;
      font-size: 14px;
      text-align: center;
      font-weight: 500;
    }
    & > svg {
      cursor: pointer;
    }
  }
`;

export const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  justify-content: baseline;
  & > div {
    display: flex;
    align-items: center;
    padding-left: 24px;

    & > p:first-child {
      font-size: 15px;
      font-weight: 700;
      line-height: 33px;
      min-width: 100px;
      color: #d1d1d1;
    }
    & > div {
      display: flex;
      gap: 16px;
      margin-right: 18px;
    }
    & > p:nth-child(3) {
      font-size: 14px;
      color: #fff;
    }
  }
`;

export const StarBox = styled.div`
  & > svg:first-child {
    path {
      fill: ${(props) => props.isFill >= 1 && "#ffce4a"};
    }
  }
  & > svg:nth-child(2) {
    path {
      fill: ${(props) => props.isFill >= 2 && "#ffce4a"};
    }
  }
  & > svg:nth-child(3) {
    path {
      fill: ${(props) => props.isFill >= 3 && "#ffce4a"};
    }
  }
  & > svg:nth-child(4) {
    path {
      fill: ${(props) => props.isFill >= 4 && "#ffce4a"};
    }
  }
`;
export const TextBox = styled.div`
  color: #646464;
  font-size: 14px;
  line-height: 18px;
  & > p:first-child {
    font-weight: bold;
  }
`;
