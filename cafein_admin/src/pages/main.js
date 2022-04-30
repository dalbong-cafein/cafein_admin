import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

import ManagementCafe from "./managementCafe";
import LogIn from "./login";

const Main = () => {
  return (
    <Containaer style={{ color: "#fff" }}>
      <Routes>
        <Route path="/" exact element={<ManagementCafe />} />
        <Route path="/login" exact element={<LogIn />} />
      </Routes>
    </Containaer>
  );
};

const Containaer = styled.div`
  position: fixed;
  top: 10rem;
  left: 296px;
`;

export default Main;
