import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import reset from "styled-reset";

//component
import SideBar from "./components/common/sidebar";
import Header from "./components/common/header";

//page
import Main from "./pages/main";
import LogIn from "./pages/login";

function App() {
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
        <SideBar />
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
  & > div:first-child {
    flex: 1;
  }
  & > div:last-child {
    flex: 3.2;
  }
`;

export default App;
