import styled from "styled-components";
export default function SubFilter({ arr, selectedItem, setSelectedItem, isMulti }) {
  const func = (item) => {
    if (isMulti) {
      let copy = [...selectedItem];
      if (selectedItem.includes("전체")) {
        copy = [];
      }

      if (selectedItem.includes(item)) {
        copy = copy.filter((copyItem) => copyItem != item);
        if (!copy.length) copy = ["전체"];
      } else {
        copy.push(item);
      }

      setSelectedItem(copy);
    } else {
      setSelectedItem(() => item);
    }
  };
  const isSelect = (item) => {
    if (isMulti) return selectedItem.includes(item);
    else return selectedItem == item;
  };

  return (
    <AreaFilter>
      {arr.map((item, i) => (
        <AreaItem key={i} isSelect={isSelect(item)} onClick={() => func(item)}>
          {item}
        </AreaItem>
      ))}
    </AreaFilter>
  );
}

const AreaFilter = styled.div`
  width: 100%;
  border-radius: 6px;
  background-color: #333333;
  display: flex;
  gap: 32px;
  padding: 10px 48px;
  align-item: center;
  margin-bottom: 16px;
`;

const AreaItem = styled.div`
  color: #fff;
  font-weight: ${(props) => (props.isSelect ? 400 : 500)};
  padding: 5px 15px;
  background-color: ${(props) => props.isSelect && "#2563EB"};
  border-radius: 15px;
  cursor: pointer;
`;
