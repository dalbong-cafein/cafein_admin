import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

import ManagementCafe from "./managementCafe";
import LogIn from "./login";

const Main = () => {
  return (
    <Containaer style={{ color: "#fff" }}>
      <Routes>
        <Route path="/management" exact element={<ManagementCafe />} />
      </Routes>
    </Containaer>
  );
};

const Containaer = styled.div`
  padding-right: 102px;
`;

export default Main;
