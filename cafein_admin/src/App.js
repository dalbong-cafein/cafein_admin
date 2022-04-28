import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import LogIn from "./pages/login";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/login" exact element={<LogIn />} />
      </Routes>
    </>
  );
}

const GlobalStyle = createGlobalStyle` 
${reset} 
`;

export default App;
