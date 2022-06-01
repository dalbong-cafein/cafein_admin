import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import App from "./App";

const rootNode = document.getElementById("root");
{
  /*basename={process.env.PUBLIC_URL}*/
}
{
  /*//수정*/
}
ReactDOM.createRoot(rootNode).render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
