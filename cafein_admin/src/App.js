import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

//component
import SideBar from "./components/common/sidebar";
import Header from "./components/common/header";

//page
import Main from "./pages/main";
import LogIn from "./pages/login";

function App() {
  return (
    <div style={{ backgroundColor: "#000" }}>
      <GlobalStyle />
      <Header />
      <SideBar />
      <Main />
    </div>
  );
}

const GlobalStyle = createGlobalStyle` 
${reset} 
`;

export default App;
