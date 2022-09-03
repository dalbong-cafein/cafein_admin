import styled from "styled-components";

export default function ComboBoxForDay({ dayPush, isEdit }) {
  return (
    <ComboBox isEdit={isEdit}>
      <div id="월" onClick={(e) => dayPush(e)}>
        월요일
      </div>
      <div id="화" onClick={(e) => dayPush(e)}>
        화요일
      </div>
      <div id="수" onClick={(e) => dayPush(e)}>
        수요일
      </div>
      <div id="목" onClick={(e) => dayPush(e)}>
        목요일
      </div>
      <div id="금" onClick={(e) => dayPush(e)}>
        금요일
      </div>
      <div id="토" onClick={(e) => dayPush(e)}>
        토요일
      </div>
      <div id="일" onClick={(e) => dayPush(e)}>
        일요일
      </div>
    </ComboBox>
  );
}

const ComboBox = styled.div`
  width: 94px;
  height: 230px;
  margin: 0 10px;
  background-color: #646464;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  position: absolute;
  transform: translate(320%, ${(props) => (props.isEdit ? "185%" : "130%")});
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
