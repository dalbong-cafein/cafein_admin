import styled from "styled-components";
export default function SubFilter({ small, arr, selectedItem, setSelectedItem, isMulti }) {
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
    <AreaFilter small={small}>
      <div>
        {arr.map((item, i) => (
          <AreaItem small={small} key={i} isSelect={isSelect(item)} onClick={() => func(item)}>
            {item}
          </AreaItem>
        ))}
      </div>
    </AreaFilter>
  );
}

const AreaFilter = styled.div`
  width: 100%;
  margin-right: ${(props) => (props.small ? "0" : "102px")};
  border-radius: 6px;
  background-color: #333333;

  margin-bottom: 16px;
  & > div {
    display: flex;
    gap: ${(props) => (props.small ? "12px" : "32px")};
    padding: ${(props) => (props.small ? "10px 10px" : "10px 48px")};
    align-item: center;
  }
`;

const AreaItem = styled.div`
  color: #fff;
  font-weight: ${(props) => (props.isSelect ? 400 : 500)};
  padding: ${(props) => (props.small ? "5px 10px" : "5px 15px")};
  font-size: ${(props) => (props.small ? "13px" : "16px")};
  background-color: ${(props) => props.isSelect && "#2563EB"};
  border-radius: 15px;
  cursor: pointer;
`;
