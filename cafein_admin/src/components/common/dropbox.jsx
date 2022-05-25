import styled from "styled-components";
const DropBox = ({ setIsDrop, arr, selected, setSelected, setArr }) => {
  const onclick = (e) => {
    const temp = e.target.id;
    const copy = [...arr];
    copy.push(selected);
    copy.splice(arr.indexOf(temp), 1);
    setSelected(e.target.id);
    setArr(copy);
    setIsDrop(false);
  };
  return (
    <Box>
      {arr.map((item, i) => (
        <p onClick={(e) => onclick(e)} key={i} id={item}>
          {item}
        </p>
      ))}
    </Box>
  );
};

const Box = styled.div`
  width: 108px;
  height: 98px;
  border-radius: 8px;
  background-color: #646464;
  position: absolute;
  box-sizing: border-box;
  transform: translate(185%, 60%);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  & > p {
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
`;

export default DropBox;
