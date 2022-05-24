import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

//component
import SideBar from "./components/common/sidebar";

//page
import Main from "./pages/main";
import LogIn from "./pages/login";

function App() {
  const [menu, setMenu] = useState("");
  const REDIRECT_URI = "http://localhost:3000/login";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
      <Routes>
        <Route
          path="/login"
          exact
          element={<LogIn KAKAO_AUTH_URL={KAKAO_AUTH_URL} />}
        />
        <Route path="/oauth/kakao/callback" exact element={<Temp />} />
      </Routes>
      <Row>
        <SideBar menu={menu} setMenu={setMenu} />
        <Main menu={menu} />
      </Row>
    </div>
  );
}

const Temp = () => {
  return <div></div>;
};

const GlobalStyle = createGlobalStyle` 
${reset} 
`;

const Row = styled.div`
  display: flex;
`;

export default App;
