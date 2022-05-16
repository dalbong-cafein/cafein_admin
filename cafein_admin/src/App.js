import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";

//component
import SideBar from "./components/common/sidebar";

//page
import Main from "./pages/main";
import LogIn from "./pages/login";

function App() {
  const [menu, setMenu] = useState("");

  return (
    <div
      style={{
        backgroundColor: "#131313",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <GlobalStyle />
      <Row>
        <SideBar menu={menu} setMenu={setMenu} />
        <Main menu={menu} />
      </Row>
    </div>
  );
}

const GlobalStyle = createGlobalStyle` 
${reset} 
`;

const Row = styled.div`
  display: flex;
`;

export default App;
