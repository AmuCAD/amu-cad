import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import EditPage from "../../pages/EditPage";
import HomePage from "../../pages/HomePage";
import AppHeader from "../AppHeader";

function App() {
  return (
    <>
      <AppHeader />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </Main>
    </>
  );
}

const Main = styled.div`
  margin-top: 100px;
`;

export default App;
