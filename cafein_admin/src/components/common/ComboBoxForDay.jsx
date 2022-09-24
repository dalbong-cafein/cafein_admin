import styled from "styled-components";

export default function ComboBoxForDay({ dayPush, isEdit, dayArr }) {
  return (
    <ComboBox isEdit={isEdit}>
      {dayArr.map((item, idx) => (
        <div key={idx} id={item} onClick={(e) => dayPush(e, item)}>
          {item}요일
        </div>
      ))}
    </ComboBox>
  );
}

const ComboBox = styled.div`
  width: 94px;
  height: 230px;
  // margin: 0 10px;
  background-color: #646464;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  position: absolute;
  transform: translate(310%, ${(props) => (props.isEdit ? "20%" : "20%")});
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
