import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

import ManagementCafe from "./managementCafe";
import Register from "./register";
import EditCafe from "./editcafe";
import Review from "./review";
import User from "./user";
import Desh from "./desh";
import Marketing from "./marketing";
import Notice from "./notice";
import QnAs from "./qna";
import Events from "./event";

const Main = ({}) => {
  return (
    <Containaer style={{ color: "#fff" }}>
      <Routes>
        <Route path="/" exact element={<Desh />} />
        <Route path="/management" exact element={<ManagementCafe />} />
        <Route path="/management/register" exact element={<Register />} />
        <Route path="/management/editCafe" exact element={<EditCafe />} />
        <Route path="/review" exact element={<Review />} />
        <Route path="/user" exact element={<User />} />
        <Route path="/marketing" exact element={<Marketing />} />
        <Route path="/event" exact element={<Events />} />
        <Route path="/notice" exact element={<Notice />} />
        <Route path="/qna" exact element={<QnAs />} />
      </Routes>
    </Containaer>
  );
};

const Containaer = styled.div`
  width: 100%;
  margin: 0 102px 0 0;
`;

export default Main;
