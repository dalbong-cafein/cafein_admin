import Stars from "./atoms/stars";
import styled from "styled-components";

const HoverContent = ({ obj }) => {
  if (obj) {
    const keys = Object.keys(obj);

    return (
      <Div>
        <div></div>
        {keys &&
          keys.map((item, i) => (
            <Stars
              width={18.4}
              gap={7}
              num={obj[item]}
              isNum={true}
              i={i + 1}
              color={"#ffce4a"}
            />
          ))}
      </Div>
    );
  }
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  position: relative;
  & > div:first-child {
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 10px solid transparent;
    border-top: 10px solid transparent;
    border-right: 20px solid #646464;
    border-left: 20px solid transparent;
    transform: translate(-130%, 0);
  }
`;

export default HoverContent;
