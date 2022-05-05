import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import reset from "styled-reset";

//component
import SideBar from "./components/common/sidebar";
import Header from "./components/common/header";

//page
import Main from "./pages/main";
import LogIn from "./pages/login";
import { useEffect, useState } from "react";

function App() {
  const [menu, setMenu] = useState("");
  useEffect(() => {
    setMenu(window.location.pathname.split("/")[1]);
  });
  return (
    <div
      style={{
        backgroundColor: "#000",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <GlobalStyle />
      <Header />
      <Row>
        <SideBar menu={menu} setMenu={setMenu} />
        <Main />
      </Row>
    </div>
  );
}

const GlobalStyle = createGlobalStyle` 
${reset} 
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  // align-items: flex-start;
  // & > div:first-child {
  //   flex: 1;
  // }
  // & > div:last-child {
  //   flex: 3.2;
  // }
`;

export default App;
