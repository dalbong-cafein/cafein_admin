import React, { Suspense } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

const ManagementCafe = React.lazy(() => import("./managementCafe"));
const Register = React.lazy(() => import("./register"));
const EditCafe = React.lazy(() => import("./editcafe"));
const Review = React.lazy(() => import("./review"));
const User = React.lazy(() => import("./user"));
const Desh = React.lazy(() => import("./Desh"));
const Marketing = React.lazy(() => import("./marketing"));
const Notice = React.lazy(() => import("./notice"));
const QnAs = React.lazy(() => import("./qna"));
const Events = React.lazy(() => import("./event"));

const Main = () => {
  return (
    <Containaer style={{ color: "#fff" }}>
      <Suspense fallback={<div />}>
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
      </Suspense>
    </Containaer>
  );
};

const Containaer = styled.div`
  width: 100%;
  margin: 0 102px 0 0;
`;

export default Main;
