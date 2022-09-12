import React, { Suspense } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

const Store = React.lazy(() => import("./Store"));
const Register = React.lazy(() => import("./RegisterCafe"));
const EditCafe = React.lazy(() => import("./EditCafe"));
const Review = React.lazy(() => import("./Review"));
const User = React.lazy(() => import("./User"));
const Desh = React.lazy(() => import("./Desh"));
const Marketing = React.lazy(() => import("./Marketing"));
const Notice = React.lazy(() => import("./Notice"));
const QnAs = React.lazy(() => import("./QnA"));
const Events = React.lazy(() => import("./Event"));

const Main = () => {
  return (
    <Containaer style={{ color: "#fff" }}>
      <Suspense fallback={<div />}>
        <Routes>
          <Route path="/" exact element={<Desh />} />
          <Route path="/management" exact element={<Store />} />
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
  height: 100%;
  margin: 0 102px 0 0;
`;

export default Main;
