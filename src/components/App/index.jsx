import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import EditPage from "../../pages/EditPage";
import HomePage from "../../pages/HomePage";
import AppHeader from "../AppHeader";
import GlobalStyles from "../GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App;
