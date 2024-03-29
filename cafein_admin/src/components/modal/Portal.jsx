import ReactDom from "react-dom";
import styled from "styled-components";
export default function Portal({ children, setModal }) {
  return ReactDom.createPortal(
    <Background
      onClick={(e) => {
        if (e.target == e.currentTarget) {
          setModal(() => false);
        }
      }}
    >
      {children}
    </Background>,
    document.getElementById("modal")
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
`;
