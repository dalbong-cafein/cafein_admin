import styled from "styled-components";
const DropBox = ({
  searchArr,
  setIsDrop,
  setSearchArr,
  searchType,
  setSearchType,
}) => {
  const onclick = (e) => {
    if (e.target.id === "전체") {
      window.location.reload();
    } else {
      const temp = e.target.id;
      const copy = [...searchArr, searchType];
      copy.splice(searchArr.indexOf(temp), 1);
      setSearchType(temp);
      setSearchArr(copy);
      setIsDrop(false);
    }
  };
  return (
    <Box>
      {searchArr?.map((item, i) => (
        <Item onClick={(e) => onclick(e)} key={i} id={item}>
          {item}
        </Item>
      ))}
    </Box>
  );
};

const Box = styled.div`
  width: 108px;
  // height: 98px;
  border-radius: 8px;
  background-color: #646464;
  position: absolute;
  box-sizing: border-box;
  transform: translate(0, 70%);
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
`;
const Item = styled.div`
  font-size: 14px;
  color: #fff;
  cursor: pointer;
`;

export default DropBox;
