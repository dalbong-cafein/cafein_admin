import styled from "styled-components";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

//reset style
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

import { useRecoilState } from "recoil";
import { adminState } from "./recoil/admin";

//component
import SideBar from "./components/common/Sidebar";

//page
import Main from "./pages/main";
import LogIn from "./pages/Login";

function App() {
  const [menu, setMenu] = useState("");
  const navigate = useNavigate();

  const [admin] = useRecoilState(adminState);

  useEffect(() => {
    if (admin.email == null && window.location.pathname.split("/")[1] !== "login") {
      navigate("/login");
    }
  });

  return (
    <Container>
      <GlobalStyle />
      <Routes>
        <Route path="/login" exact element={<LogIn />} />
      </Routes>
      <Row>
        <SideBar menu={menu} setMenu={setMenu} />
        <Main menu={menu} />
      </Row>
    </Container>
  );
}

const GlobalStyle = createGlobalStyle` 
${reset} 
`;
const Container = styled.div`
  background-color: #131313;
  height: 100vh;
  width: 100vw;
  min-width: 1440px;
  overflow-y: hidden;
`;
const Row = styled.div`
  display: flex;
`;
export default App;
