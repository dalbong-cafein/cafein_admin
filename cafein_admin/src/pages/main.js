import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

import ManagementCafe from "./managementCafe";
import Register from "./register";
import { useEffect, useState } from "react";

const Main = ({}) => {
  return (
    <Containaer style={{ color: "#fff" }}>
      <Routes>
        <Route path="/desh" exact element={<Temp />} />
        <Route path="/management" exact element={<ManagementCafe />} />
        <Route path="/management/register" exact element={<Register />} />
        <Route path="/review" exact element={<Temp />} />
        <Route path="/user" exact element={<Temp />} />
        <Route path="/marketing" exact element={<Temp />} />
        <Route path="/notice" exact element={<Temp />} />
        <Route path="/statistics" exact element={<Temp />} />
      </Routes>
    </Containaer>
  );
};

const Temp = () => {
  return <div style={{ color: "#fff", width: "100%" }}>아직</div>;
};

const Containaer = styled.div`
  width: 100%;
  padding: 0 102px 0 0;
`;

export default Main;
